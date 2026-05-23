import {
  getRepository,
  getRepositorySettings,
  listContributorIssues,
  listContributorPullRequests,
  listIssues,
  listOtherOpenPullRequests,
  listPullRequests,
  markInstallationDeleted,
  persistAdvisory,
  recordWebhookEvent,
  upsertInstallation,
  upsertIssueFromGitHub,
  upsertPullRequestFromGitHub,
  upsertRepositoryFromGitHub,
} from "../db/repositories";
import { createOrUpdateCheckRun, getInstallationId } from "../github/app";
import { createOrUpdatePrIntelligenceComment } from "../github/comments";
import { fetchPublicContributorProfile } from "../github/public";
import { refreshRegistry } from "../registry/sync";
import { buildIssueAdvisory, buildPullRequestAdvisory } from "../rules/advisory";
import {
  buildCollisionReport,
  buildContributorProfile,
  buildPreflightResult,
  buildPublicPrIntelligenceComment,
  buildQueueHealth,
  detectGittensorContributor,
  shouldPublishPrIntelligenceComment,
} from "../signals/engine";
import type { GitHubWebhookPayload, JobMessage } from "../types";

export async function processJob(env: Env, message: JobMessage): Promise<void> {
  switch (message.type) {
    case "refresh-registry":
      await refreshRegistry(env);
      return;
    case "github-webhook":
      await processGitHubWebhook(env, message.deliveryId, message.eventName, message.payload);
      return;
  }
}

async function processGitHubWebhook(env: Env, deliveryId: string, eventName: string, payload: GitHubWebhookPayload): Promise<void> {
  try {
    if (eventName === "installation" && payload.action === "deleted" && payload.installation?.id) {
      await markInstallationDeleted(env, payload.installation.id);
      await recordWebhookEvent(env, {
        deliveryId,
        eventName,
        action: payload.action,
        installationId: payload.installation.id,
        repositoryFullName: payload.repository?.full_name,
        payloadHash: "processed",
        status: "processed",
      });
      return;
    }

    await upsertInstallation(env, payload);

    const installationId = getInstallationId(payload);
    if (payload.repositories) {
      for (const repo of payload.repositories) await upsertRepositoryFromGitHub(env, repo, installationId ?? undefined);
    }
    if (payload.repository) await upsertRepositoryFromGitHub(env, payload.repository, installationId ?? undefined);

    if (payload.repository?.full_name && payload.pull_request) {
      const pr = await upsertPullRequestFromGitHub(env, payload.repository.full_name, payload.pull_request);
      const repo = await getRepository(env, payload.repository.full_name);
      const otherOpenPullRequests = await listOtherOpenPullRequests(env, payload.repository.full_name, pr.number);
      const advisory = buildPullRequestAdvisory(repo, pr, { otherOpenPullRequests });
      await persistAdvisory(env, advisory);
      if (installationId && advisory.headSha) await createOrUpdateCheckRun(env, installationId, payload.repository.full_name, advisory);
      if (installationId) {
        await maybePublishPrIntelligenceComment(env, installationId, payload.repository.full_name, pr, repo).catch((error) => {
          console.error(
            JSON.stringify({
              level: "warn",
              event: "pr_intelligence_comment_failed",
              deliveryId,
              repository: payload.repository?.full_name,
              pullNumber: pr.number,
              error: error instanceof Error ? error.message : "unknown error",
            }),
          );
        });
      }
    }

    if (payload.repository?.full_name && payload.issue && !payload.issue.pull_request) {
      const issue = await upsertIssueFromGitHub(env, payload.repository.full_name, payload.issue);
      const repo = await getRepository(env, payload.repository.full_name);
      const advisory = buildIssueAdvisory(repo, issue);
      await persistAdvisory(env, advisory);
    }

    await recordWebhookEvent(env, {
      deliveryId,
      eventName,
      action: payload.action,
      installationId: payload.installation?.id,
      repositoryFullName: payload.repository?.full_name,
      payloadHash: "processed",
      status: "processed",
    });
  } catch (error) {
    await recordWebhookEvent(env, {
      deliveryId,
      eventName,
      action: payload.action,
      installationId: payload.installation?.id,
      repositoryFullName: payload.repository?.full_name,
      payloadHash: "processed",
      status: "error",
      errorSummary: error instanceof Error ? error.message : "unknown error",
    });
    throw error;
  }
}

async function maybePublishPrIntelligenceComment(
  env: Env,
  installationId: number,
  repoFullName: string,
  pr: Awaited<ReturnType<typeof upsertPullRequestFromGitHub>>,
  repo: Awaited<ReturnType<typeof getRepository>>,
): Promise<void> {
  const settings = await getRepositorySettings(env, repoFullName);
  if (settings.commentMode === "off") return;
  const author = pr.authorLogin;
  if (!author) return;

  const [contributorPullRequests, contributorIssues, repoIssues, repoPullRequests, github] = await Promise.all([
    listContributorPullRequests(env, author),
    listContributorIssues(env, author),
    listIssues(env, repoFullName),
    listPullRequests(env, repoFullName),
    fetchPublicContributorProfile(author),
  ]);
  const detection = detectGittensorContributor(author, pr, contributorPullRequests, contributorIssues);
  if (!shouldPublishPrIntelligenceComment(settings, detection)) return;

  const profile = buildContributorProfile(author, github, contributorPullRequests, contributorIssues);
  const collisions = buildCollisionReport(repoFullName, repoIssues, repoPullRequests);
  const queueHealth = buildQueueHealth(repo, repoIssues, repoPullRequests, collisions);
  const preflight = buildPreflightResult(
    {
      repoFullName,
      contributorLogin: author,
      title: pr.title,
      body: pr.body ?? undefined,
      labels: pr.labels,
      linkedIssues: pr.linkedIssues,
      authorAssociation: pr.authorAssociation ?? undefined,
    },
    repo,
    repoIssues,
    repoPullRequests,
  );
  const body = buildPublicPrIntelligenceComment({
    repo,
    pr,
    profile,
    detection,
    queueHealth,
    collisions,
    preflight,
    settings,
  });
  await createOrUpdatePrIntelligenceComment(env, installationId, repoFullName, pr.number, body);
}
