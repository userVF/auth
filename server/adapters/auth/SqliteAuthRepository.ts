import crypto from 'node:crypto'
import { DatabaseSync } from 'node:sqlite'
import { join } from 'node:path'
import { type IAuthRepository } from '../../ports/auth/IAuthRepository.ts'
import { type CodeResult } from '../../entities/auth/CodeResult.ts'
import { type CodeDbRow, Code } from '../../entities/auth/Code.ts'
import { type UserDbRow, User } from '../../entities/User.ts'

export class AuthRepository implements IAuthRepository {

  db: DatabaseSync
  constructor() {
    this.db = new DatabaseSync(
      join(import.meta.dirname, '../../database/auth.sqlite')
    )
  }

  async initCode(identifier: string, expirationSeconds: number, cooldownSeconds: number): Promise<CodeResult> {
    this.db.exec('BEGIN')
    try {
      const validStmt = this.db.prepare(`SELECT *,
        ROUND((julianday('now') - julianday(requested_at)) * 86400) AS elapsed_seconds
        FROM login_codes WHERE identifier = $identifier AND expires_at > datetime('now')
        ORDER BY requested_at DESC LIMIT 1`)
      const validRow = validStmt.get({ identifier }) as CodeDbRow
      const validCode = validRow ? Code.fromDbRow(validRow) : null

      if (!validCode) {
        const newStmt = this.db.prepare(`INSERT INTO login_codes(
            identifier, code, requested_at, expires_at
          ) VALUES(
            $identifier, $code, datetime('now'), datetime('now', '+' || $expirationSeconds || ' seconds')
          ) RETURNING *`
        )
        const code = crypto.randomInt(10_000, 100_000).toString()
        const freshRow = newStmt.get({ identifier, code, expirationSeconds }) as CodeDbRow
        const newCode = Code.fromDbRow(freshRow)
        this.db.exec('COMMIT')
        return { status: 'new', retryAfter: cooldownSeconds, code: newCode }
      }

      if (validCode.elapsedSeconds < cooldownSeconds) {
        this.db.exec('COMMIT')
        const remainSeconds = cooldownSeconds - validCode.elapsedSeconds
        return { status: 'cooldown', retryAfter: remainSeconds }
      }

      const updateStmt = this.db.prepare(`UPDATE login_codes
        SET requested_at = datetime('now'), attempts = 0
        WHERE id = $id RETURNING *`
      )
      const updatedRow = updateStmt.get({ id: validCode.id }) as CodeDbRow
      const updatedCode = Code.fromDbRow(updatedRow)
      this.db.exec('COMMIT')
      return { status: 'update', retryAfter: cooldownSeconds, code: updatedCode }
    } catch (err) {
      this.db.exec('ROLLBACK')
      throw err
    }
  }

  async verifyCode(identifier: string, code: string, maxAttempts: number): Promise<CodeResult> {
    this.db.exec('BEGIN')
    try {
      const validStmt = this.db.prepare(`SELECT *
        FROM login_codes WHERE identifier = $identifier
        AND expires_at > datetime('now')
        ORDER BY requested_at DESC LIMIT 1`
      )
      const validRow = validStmt.get({ identifier }) as CodeDbRow
      const validCode = validRow ? Code.fromDbRow(validRow) : null

      if (!validCode) {
        this.db.exec('COMMIT')
        return { status: 'expiredCode' }
      }

      if (validCode.attempts >= maxAttempts) {
        const expireStmt = this.db.prepare(`UPDATE login_codes
          SET expires_at = datetime('now') WHERE id = $id`
        )
        expireStmt.run({ id: validCode.id })
        this.db.exec('COMMIT')
        return { status: 'expiredCode' }
      }

      const incrementStmt = this.db.prepare(`UPDATE login_codes
        SET attempts = attempts + 1 WHERE id = $id`)
      incrementStmt.run({ id: validCode.id })

      if (validCode.code === code) {
        const expireStmt = this.db.prepare(`UPDATE login_codes
          SET expires_at = datetime('now') WHERE id = $id`
        )
        expireStmt.run({ id: validCode.id })
        this.db.exec('COMMIT')
        return { status: 'welcome', code: validCode }
      }

      this.db.exec('COMMIT')
      return { status: 'invalidCode' }
    } catch (err) {
      this.db.exec('ROLLBACK')
      throw err
    }
  }

  async createUser(code: Code): Promise<User> {
    const insertStmt = this.db.prepare(`INSERT INTO users(identifier)
      VALUES($identifier) RETURNING *`
    )
    const userRow = insertStmt.get({ identifier: code.identifier }) as UserDbRow
    return User.fromDbRow(userRow)
  }
  
  async getUser(identifier: string): Promise<User | null> {
    const stmt = this.db.prepare('SELECT * FROM users WHERE identifier = $identifier')
    const row = stmt.get({ identifier }) as UserDbRow
    return row ? User.fromDbRow(row) : null
  }
}