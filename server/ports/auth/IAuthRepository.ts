import type { CodeResult } from '../../entities/auth/CodeResult.ts'
import { Code } from '../../entities/auth/Code.ts'
import { User } from '../../entities/User.ts'

export interface IAuthRepository {
  initCode(identifier: string, expirationSeconds: number, cooldownSeconds: number): Promise<CodeResult>
  verifyCode(identifier: string, code: string, maxAttempts: number): Promise<CodeResult>
  createUser(code: Code): Promise<User>,  
  getUser(identifier: string): Promise<User | null>,
}