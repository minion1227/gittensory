CREATE TABLE IF NOT EXISTS repository_settings (
  repo_full_name TEXT PRIMARY KEY,
  comment_mode TEXT NOT NULL DEFAULT 'off',
  public_signal_level TEXT NOT NULL DEFAULT 'standard',
  check_run_mode TEXT NOT NULL DEFAULT 'enabled',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
