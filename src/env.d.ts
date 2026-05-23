declare global {
  interface Env {
    GITHUB_WEBHOOK_SECRET: string;
    GITHUB_APP_PRIVATE_KEY: string;
    GITTENSORY_API_TOKEN: string;
    GITTENSORY_MCP_TOKEN: string;
    INTERNAL_JOB_TOKEN: string;
  }
}

export {};
