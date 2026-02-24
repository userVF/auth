CREATE TABLE users (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  identifier TEXT NOT NULL UNIQUE,
  user_group TEXT NOT NULL DEFAULT 'user',
  is_enabled INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT
);
INSERT INTO users(id, identifier, user_group) VALUES (0, '+0(000)000-00-00', 'guest');
INSERT INTO users(identifier, user_group) VALUES ('+7(777)777-77-77', 'admin');

CREATE TABLE sessions (
  id TEXT NOT NULL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  user_group TEXT NOT NULL,
  lang TEXT NOT NULL DEFAULT '',
  ip TEXT NOT NULL DEFAULT '',
  ua TEXT NOT NULL DEFAULT '',
  path TEXT NOT NULL DEFAULT '',
  redirect_path TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  requested_at TEXT,
  expires_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE login_codes (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  identifier TEXT NOT NULL,
  code TEXT NOT NULL,
  requested_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL,
  attempts INTEGER DEFAULT 0 NOT NULL
);
CREATE INDEX idx_login_codes_identifier_expires ON login_codes (identifier, expires_at);
