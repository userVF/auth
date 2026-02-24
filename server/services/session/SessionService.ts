import crypto from 'node:crypto'
import { type ISessionRepository } from '../../ports/session/ISessionRepository.ts'
import { User } from '../../entities/User.ts'
import { Session, type SessionParams } from '../../entities/session/Session.ts'
import { type SessionResult } from '../../entities/session/SessionResult.ts'

export class SessionService {
  logger: Console
  sessionRepository: ISessionRepository
  expirationSeconds: number
  constructor(logger: Console, sessionRepository: ISessionRepository) {
    this.logger = logger
    this.sessionRepository = sessionRepository
    this.expirationSeconds = Number(process.env.COOKIE_MAX_AGE)
  }
  async guest(params: SessionParams): Promise<SessionResult> {
    try {
      const sessionId = this.createSessionId()
      const session = await this.sessionRepository.guest(sessionId, params, this.expirationSeconds)
      return this.getSessionResult(session)      
    } catch (err) { 
      this.logger.error({ err })
      throw err
	  }
  }
  async login(user: User, params: SessionParams): Promise<SessionResult> {
    try {
      const sessionId = this.createSessionId()
      const session = await this.sessionRepository.login(sessionId, user, params, this.expirationSeconds)
      return this.getSessionResult(session)      
    } catch (err) { 
      this.logger.error({ err })
      throw err
	  }
  }
  async touch(sessionId: string, params: SessionParams): Promise<SessionResult> {
    try {
      const session = await this.sessionRepository.touch(sessionId, params, this.expirationSeconds)
      if (session) {
        return this.getSessionResult(session)        
      }
      return null
    } catch (err) { 
      this.logger.error({ err })
      throw err
	  }
  }
  async logout(sessionId: string, params: SessionParams): Promise<void> {
    try {
      await this.sessionRepository.logout(sessionId, params)
    } catch (err) { 
      this.logger.error({ err })
      throw err
	  }
  }
  createSessionId(): string {
    return crypto.randomBytes(24).toString('hex')
  }
  getSessionResult(session: Session): SessionResult {
    return { 
      session: {
        id: session['id'],
        user: {id: session['userId'], group: session['userGroup']},
        lang: session['lang'],
        redirectPath: session['redirectPath'],
      }
    }
  }
}