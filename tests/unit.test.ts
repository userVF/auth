'use strict'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { join } from 'node:path'
import { loadEnvFile } from 'node:process'

import { AuthService } from '../server/services/auth/AuthService.ts'
import { type UserDbRow, User } from '../server/entities/User.ts'
import { type CodeDbRow, Code } from '../server/entities/auth/Code.ts'
import { type CodeResult } from '../server/entities/auth/CodeResult.ts'
import { SessionService } from '../server/services/session/SessionService.ts'
import { type SessionDbRow, Session, type SessionParams } from '../server/entities/session/Session.ts'

loadEnvFile(join(import.meta.dirname, '..', '.env'))

test('Auth', async () => {
  class AuthRepo {    
    async initCode(
      identifier: string, 
      expirationSeconds: number, 
      cooldownSeconds: number
    ): Promise<CodeResult> {
      const dbRow: CodeDbRow = {
        id: 7,
        identifier,
        code: '77777',
        requested_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + expirationSeconds * 1000).toISOString(),
        attempts: 0,
      }
      dbRow.elapsed_seconds = (Date.now() - new Date(dbRow.requested_at).getTime()) / 1000
      const code = Code.fromDbRow(dbRow)
      if (code.elapsedSeconds < cooldownSeconds) {
        const remainSeconds = cooldownSeconds - code.elapsedSeconds
        return { status: 'cooldown', retryAfter: remainSeconds, code }
      }
      return { status: 'new', retryAfter: cooldownSeconds, code }
    }
    async verifyCode(
      identifier: string,
      code: string,
      maxAttempts: number
    ): Promise<CodeResult> {
      const dbRow: CodeDbRow = {
        id: 7,
        identifier,
        code: '77777',
        requested_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 300 * 1000).toISOString(),
        attempts: 0,
      }
      const validCode = Code.fromDbRow(dbRow)
      if (validCode.code === code) {
        return { status: 'welcome', code: validCode }
      }
      return { status: 'invalidCode' }
    }
    async createUser(code: Code): Promise<User> {
      const dbRow: UserDbRow = {
        id: 8,
        identifier: code.identifier,
        user_group: 'user',
        is_enabled: true,
        created_at: new Date().toISOString(),
        updated_at: null,
      }
      return User.fromDbRow(dbRow)
    }
    async getUser(identifier: string): Promise<User | null> {
      const dbRow: UserDbRow = {
        id: 7,
        identifier,
        user_group: 'user',
        is_enabled: true,
        created_at: new Date().toISOString(),
        updated_at: null,
      }
      const user = User.fromDbRow(dbRow)
      return user
    }
  }
  const repo = new AuthRepo()
  const service = new AuthService(console, repo)
  const codeResult = await service.init('7777777777')  
  assert.ok(codeResult.code instanceof Code)
  assert.strictEqual(codeResult.status, 'cooldown')
  const wrongResult = await service.complete('7777777777', '00000')
  assert.strictEqual(wrongResult.status, 'invalidCode')
})

test('Session', async () => {
  class SessionRepo {
    async guest(sessionId: string, params: SessionParams, expirationSeconds: number): Promise<Session> {
      const dbRow: SessionDbRow = {
        id: sessionId,
        user_id: 0,
        user_group: 'guest',
        lang: params.lang,
        ip: params.ip,
        ua: params.ua,
        path: params.path,
        redirect_path: params.redirectPath,
        created_at: new Date().toISOString(),
        extended_at: null,
        expires_at: new Date(Date.now() + expirationSeconds * 1000).toISOString(),
      }
      return Session.fromDbRow(dbRow)
    }
    async login(sessionId: string, user: User, params: SessionParams, expirationSeconds: number): Promise<Session> {
      const dbRow: SessionDbRow = {
        id: sessionId,
        user_id: user.id,
        user_group: user.userGroup,
        lang: params.lang,
        ip: params.ip,
        ua: params.ua,
        path: params.path,
        redirect_path: params.redirectPath,
        created_at: new Date().toISOString(),
        extended_at: null,
        expires_at: new Date(Date.now() + expirationSeconds * 1000).toISOString(),
      }
      return Session.fromDbRow(dbRow)
    }
    async touch(sessionId: string, params: SessionParams, expirationSeconds: number): Promise<Session | null> {
      const dbRow: SessionDbRow = {
        id: sessionId,
        user_id: 7,
        user_group: 'user',
        lang: params.lang,
        ip: params.ip,
        ua: params.ua,
        path: params.path,
        redirect_path: params.redirectPath,
        created_at: new Date().toISOString(),
        extended_at: null,
        expires_at: new Date(Date.now() + expirationSeconds * 1000).toISOString(),
      }
      return Session.fromDbRow(dbRow)
    }
    async logout(sessionId: string, params: SessionParams): Promise<void> {
      // no-op
    }
  }
  const repo = new SessionRepo()
  const service = new SessionService(console, repo)
  const params: SessionParams = {
    lang: 'en',
    ip: '127.0.0.1',
    path: '/',
    ua: 'test-agent',
    redirectPath: '/profile',
  }

  const guestResult = await service.guest(params)
  assert.ok(guestResult.session)
  assert.strictEqual(guestResult.session.user.id, 0)
  assert.strictEqual(guestResult.session.user.group, 'guest')
  assert.strictEqual(guestResult.session.lang, 'en')

  const user = new User({
    id: 7,
    identifier: 'test',
    userGroup: 'user',
    isEnabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  })
  const loginResult = await service.login(user, params)
  assert.strictEqual(loginResult.session.user.id, 7)
  assert.strictEqual(loginResult.session.user.group, 'user')

  const touchResult = await service.touch('test-session-id', params)
  assert.ok(touchResult.session)

  await service.logout('test-session-id', params)
})