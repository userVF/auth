import { User } from '../../entities/User.ts'
import { Session, type SessionParams } from '../../entities/session/Session.ts'

export interface ISessionRepository {
  guest(sessionId: string, params: SessionParams, age: number): Promise<Session>,
  login(sessionId: string, user: User, params: SessionParams, age: number): Promise<Session>,
  touch(sessionId: string, params: SessionParams, age: number): Promise<Session | null>,
  logout(sessionId: string, params: SessionParams): Promise<void>,
}