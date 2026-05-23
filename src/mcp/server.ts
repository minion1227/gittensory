import { createMcpHandler } from "agents/mcp";
import type { Context } from "hono";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  getBounty,
  getIssue,
  getRepository,
  listAllIssues,
  listAllPullRequests,
  listContributorIssues,
  listContributorPullRequests,
  listIssues,
  listPullRequests,
  listRepositories,
} from "../db/repositories";
import { fetchPublicContributorProfile } from "../github/public";
import {
  buildBountyAdvisory,
  buildCollisionReport,
  buildConfigQuality,
  buildContributorOpportunities,
  buildContributorProfile,
  buildPreflightResult,
  buildQueueHealth,
} from "../signals/engine";

type AppContext = Context<{ Bindings: Env }>;
type ToolPayload = {
  summary: string;
  data: Record<string, unknown>;
};

const ownerRepoShape = {
  owner: z.string().min(1),
  repo: z.string().min(1),
};

const loginShape = {
  login: z.string().min(1),
};

const bountyShape = {
  id: z.string().min(1),
};

const preflightShape = {
  repoFullName: z.string().min(3),
  contributorLogin: z.string().min(1).optional(),
  title: z.string().min(1),
  body: z.string().optional(),
  labels: z.array(z.string()).optional(),
  changedFiles: z.array(z.string()).optional(),
  linkedIssues: z.array(z.number().int().positive()).optional(),
  tests: z.array(z.string()).optional(),
  authorAssociation: z.string().optional(),
};

export async function handleMcpRequest(c: AppContext): Promise<Response> {
  if (c.req.method === "OPTIONS") return new Response(null, { status: 204 });
  if (!(await isAuthorizedMcpRequest(c))) return c.json({ error: "unauthorized" }, 401);

  const server = new GittensoryMcp(c.env).createServer();
  return createMcpHandler(server, { route: "/mcp", enableJsonResponse: true })(c.req.raw, c.env, getExecutionContext(c));
}

export class GittensoryMcp {
  constructor(private readonly env: Env) {}

  createServer(): McpServer {
    const server = new McpServer({
      name: "gittensory",
      version: "0.1.0",
    });

    server.registerTool(
      "gittensory_get_repo_context",
      {
        description: "Return Gittensory repo context: registration, lane, queue health, collisions, and config quality.",
        inputSchema: ownerRepoShape,
      },
      async (input) => this.toolResult(await this.getRepoContext(input)),
    );

    server.registerTool(
      "gittensory_get_contributor_profile",
      {
        description: "Return an evidence-backed Gittensory contributor profile for a GitHub login.",
        inputSchema: loginShape,
      },
      async (input) => this.toolResult(await this.getContributorProfile(input.login)),
    );

    server.registerTool(
      "gittensory_find_opportunities",
      {
        description: "Return ranked registered-repo opportunities for a GitHub login using cached Gittensory signals.",
        inputSchema: loginShape,
      },
      async (input) => this.toolResult(await this.findOpportunities(input.login)),
    );

    server.registerTool(
      "gittensory_preflight_pr",
      {
        description: "Preflight a planned PR for lane correctness, duplicate risk, linked issues, and review burden.",
        inputSchema: preflightShape,
      },
      async (input) => this.toolResult(await this.preflightPr(input)),
    );

    server.registerTool(
      "gittensory_get_queue_health",
      {
        description: "Return maintainer burden and queue-health signals for a registered repository.",
        inputSchema: ownerRepoShape,
      },
      async (input) => this.toolResult(await this.getQueueHealth(input)),
    );

    server.registerTool(
      "gittensory_get_collisions",
      {
        description: "Return duplicate and WIP collision clusters for a registered repository.",
        inputSchema: ownerRepoShape,
      },
      async (input) => this.toolResult(await this.getCollisions(input)),
    );

    server.registerTool(
      "gittensory_get_bounty_advisory",
      {
        description: "Return lifecycle, funding, and consensus-risk context for a cached Gittensor bounty.",
        inputSchema: bountyShape,
      },
      async (input) => this.toolResult(await this.getBountyAdvisory(input.id)),
    );

    return server;
  }

  private async getRepoContext(input: { owner: string; repo: string }): Promise<ToolPayload> {
    const fullName = `${input.owner}/${input.repo}`;
    const [repo, issues, pullRequests] = await Promise.all([getRepository(this.env, fullName), listIssues(this.env, fullName), listPullRequests(this.env, fullName)]);
    const collisions = buildCollisionReport(fullName, issues, pullRequests);
    return {
      summary: `Gittensory repo context for ${fullName}.`,
      data: {
        repo,
        queueHealth: buildQueueHealth(repo, issues, pullRequests, collisions),
        collisions,
        configQuality: buildConfigQuality(repo, issues, pullRequests, fullName),
      },
    };
  }

  private async getContributorProfile(login: string): Promise<ToolPayload> {
    const [github, pullRequests, issues] = await Promise.all([
      fetchPublicContributorProfile(login),
      listContributorPullRequests(this.env, login),
      listContributorIssues(this.env, login),
    ]);
    return {
      summary: `Gittensory contributor profile for ${login}.`,
      data: buildContributorProfile(login, github, pullRequests, issues) as unknown as Record<string, unknown>,
    };
  }

  private async findOpportunities(login: string): Promise<ToolPayload> {
    const [github, contributorPullRequests, contributorIssues, repositories, allIssues, allPullRequests] = await Promise.all([
      fetchPublicContributorProfile(login),
      listContributorPullRequests(this.env, login),
      listContributorIssues(this.env, login),
      listRepositories(this.env),
      listAllIssues(this.env),
      listAllPullRequests(this.env),
    ]);
    const profile = buildContributorProfile(login, github, contributorPullRequests, contributorIssues);
    return {
      summary: `Gittensory opportunities for ${login}.`,
      data: {
        profile,
        opportunities: buildContributorOpportunities(profile, repositories, allIssues, allPullRequests),
      },
    };
  }

  private async preflightPr(input: z.infer<z.ZodObject<typeof preflightShape>>): Promise<ToolPayload> {
    const [repo, issues, pullRequests] = await Promise.all([
      getRepository(this.env, input.repoFullName),
      listIssues(this.env, input.repoFullName),
      listPullRequests(this.env, input.repoFullName),
    ]);
    return {
      summary: `Gittensory PR preflight for ${input.repoFullName}.`,
      data: buildPreflightResult(input, repo, issues, pullRequests) as unknown as Record<string, unknown>,
    };
  }

  private async getQueueHealth(input: { owner: string; repo: string }): Promise<ToolPayload> {
    const fullName = `${input.owner}/${input.repo}`;
    const [repo, issues, pullRequests] = await Promise.all([getRepository(this.env, fullName), listIssues(this.env, fullName), listPullRequests(this.env, fullName)]);
    const collisions = buildCollisionReport(fullName, issues, pullRequests);
    return {
      summary: `Gittensory queue health for ${fullName}.`,
      data: buildQueueHealth(repo, issues, pullRequests, collisions) as unknown as Record<string, unknown>,
    };
  }

  private async getCollisions(input: { owner: string; repo: string }): Promise<ToolPayload> {
    const fullName = `${input.owner}/${input.repo}`;
    const [issues, pullRequests] = await Promise.all([listIssues(this.env, fullName), listPullRequests(this.env, fullName)]);
    return {
      summary: `Gittensory collision report for ${fullName}.`,
      data: buildCollisionReport(fullName, issues, pullRequests) as unknown as Record<string, unknown>,
    };
  }

  private async getBountyAdvisory(id: string): Promise<ToolPayload> {
    const bounty = await getBounty(this.env, id);
    if (!bounty) throw new Error("Bounty not found.");
    const [repo, issue] = await Promise.all([getRepository(this.env, bounty.repoFullName), getIssue(this.env, bounty.repoFullName, bounty.issueNumber)]);
    return {
      summary: `Gittensory bounty advisory for ${id}.`,
      data: buildBountyAdvisory(bounty, repo, issue) as unknown as Record<string, unknown>,
    };
  }

  private toolResult(payload: ToolPayload) {
    return {
      content: [
        {
          type: "text" as const,
          text: `${payload.summary}\n\n${JSON.stringify(payload.data, null, 2)}`,
        },
      ],
      structuredContent: payload.data,
    };
  }
}

async function isAuthorizedMcpRequest(c: AppContext): Promise<boolean> {
  const expected = c.env.GITTENSORY_MCP_TOKEN;
  if (!expected) return false;
  const actual = c.req.header("authorization")?.replace(/^Bearer\s+/i, "");
  if (!actual) return false;
  return actual === expected;
}

function getExecutionContext(c: AppContext): ExecutionContext<unknown> {
  try {
    return c.executionCtx as unknown as ExecutionContext<unknown>;
  } catch {
    return {
      waitUntil: () => {},
      passThroughOnException: () => {},
      exports: {},
      props: {},
    } as unknown as ExecutionContext<unknown>;
  }
}
