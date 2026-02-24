import { DatabaseSync } from 'node:sqlite'
import { join } from 'node:path'
import { type ISessionRepository } from '../../ports/session/ISessionRepository.ts'
import { User } from '../../entities/User.ts'
import { Session, type SessionParams, type SessionDbRow } from '../../entities/session/Session.ts'

export class SessionRepository implements ISessionRepository {
  
  db: DatabaseSync
  constructor() {
    this.db = new DatabaseSync(
      join(import.meta.dirname, '../../database/auth.sqlite')
    )
  }

  async guest(sessionId: string, params: SessionParams, expirationSeconds: number): Promise<Session> {
    const stmt = this.db.prepare(`INSERT INTO sessions(
        id, user_id, user_group, lang, ip, path, redirect_path, ua, expires_at
      ) VALUES(
        $sessionId, 0, 'guest', $lang, $ip, $path, $redirectPath, $ua,
        datetime('now', '+' || $expirationSeconds || ' seconds')
      ) RETURNING *`
    )
    const row = stmt.get({
      sessionId, expirationSeconds,
      lang: params.lang, ip: params.ip, path: params.path,
      redirectPath: params.redirectPath, ua: params.ua,
    }) as SessionDbRow
    return Session.fromDbRow(row)
  }

  async touch(sessionId: string, params: SessionParams, expirationSeconds: number): Promise<Session | null> {
    let paramFields = `ip = $ip, path = $path, ua = $ua`
    const bindings: Record<string, string | number> = {     
      ip: params.ip, path: params.path, ua: params.ua,
      expirationSeconds, sessionId,
    }
    if (!params.keepLang) {
      paramFields += ', lang = $lang'
      bindings.lang = params.lang
    }
    if (!params.keepRedirectPath) {
      paramFields += ', redirect_path = $redirectPath'
      bindings.redirectPath = params.redirectPath
    }
    const stmt = this.db.prepare(`UPDATE sessions
      SET ${paramFields}, requested_at = datetime('now'),
      expires_at = datetime('now', '+' || $expirationSeconds || ' seconds')
      WHERE id = $sessionId AND expires_at > datetime('now') RETURNING *`
    )
    const row = stmt.get(bindings) as SessionDbRow
    return row ? Session.fromDbRow(row) : null
  }

  async login(sessionId: string, user: User, params: SessionParams, expirationSeconds: number): Promise<Session> {
    const stmt = this.db.prepare(`INSERT INTO sessions(
      id, user_id, user_group, lang, ip, path, ua, expires_at
    ) VALUES(
      $sessionId, $userId, $userGroup, $lang, $ip, $path, $ua,
      datetime('now', '+' || $expirationSeconds || ' seconds')
    ) RETURNING *`)
    const row = stmt.get({
      sessionId, userId: user.id, userGroup: user.userGroup,      
      lang: params.lang, ip: params.ip, path: params.path, ua: params.ua,
      expirationSeconds,
    }) as SessionDbRow
    return Session.fromDbRow(row)
  }

  async logout(sessionId: string, params: SessionParams): Promise<void> {
    const stmt = this.db.prepare(`UPDATE sessions
      SET lang = $lang, ip = $ip, path = $path, ua = $ua, expires_at = datetime('now')
      WHERE id = $sessionId RETURNING *`
    )
    stmt.run({      
      lang: params.lang, ip: params.ip, path: params.path, ua: params.ua,
      sessionId,
    })
  }

}