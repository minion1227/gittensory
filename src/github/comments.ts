import { Octokit } from "@octokit/core";
import { createInstallationToken } from "./app";

export const PR_INTELLIGENCE_COMMENT_MARKER = "<!-- gittensory-pr-intelligence -->";

type IssueComment = {
  id: number;
  body?: string | null;
  html_url?: string;
  user?: {
    type?: string;
    login?: string;
  } | null;
};

export async function createOrUpdatePrIntelligenceComment(
  env: Env,
  installationId: number,
  repoFullName: string,
  pullNumber: number,
  body: string,
): Promise<{ id: number; html_url?: string } | null> {
  const [owner, repo] = repoFullName.split("/");
  if (!owner || !repo) throw new Error(`Invalid repository full name: ${repoFullName}`);

  const token = await createInstallationToken(env, installationId);
  const octokit = new Octokit({ auth: token });
  const comments = await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}/comments", {
    owner,
    repo,
    issue_number: pullNumber,
    per_page: 100,
  });
  const existing = (comments.data as IssueComment[]).find((comment) => comment.body?.includes(PR_INTELLIGENCE_COMMENT_MARKER));
  if (existing) {
    const response = await octokit.request("PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}", {
      owner,
      repo,
      comment_id: existing.id,
      body,
    });
    return response.data as { id: number; html_url?: string };
  }
  const response = await octokit.request("POST /repos/{owner}/{repo}/issues/{issue_number}/comments", {
    owner,
    repo,
    issue_number: pullNumber,
    body,
  });
  return response.data as { id: number; html_url?: string };
}
