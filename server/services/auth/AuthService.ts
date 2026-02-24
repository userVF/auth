import type { IAuthRepository } from '../../ports/auth/IAuthRepository.ts'
import type { CodeResult } from '../../entities/auth/CodeResult.ts'
import type { UserResult } from '../../entities/UserResult.ts'

export class AuthService {
  logger: Console
  authRepository: IAuthRepository
  expirationSeconds: number
  cooldownSeconds: number
  maxAttempts: number
  constructor(logger: Console, authRepository: IAuthRepository) {
    this.logger = logger
    this.authRepository = authRepository
    this.expirationSeconds = Number(process.env.LOGIN_CODE_AGE)
    this.cooldownSeconds = Number(process.env.LOGIN_CODE_COOLDOWN)
    this.maxAttempts = Number(process.env.LOGIN_CODE_ATTEMPTS)
  }
  async init(identifier: string): Promise<CodeResult> {
    const user = await this.authRepository.getUser(identifier)
    if (user && !user.isEnabled) {
      return { status: 'invalidRequest' }
    }
    try {
      return {
        ...await this.authRepository.initCode(identifier, this.expirationSeconds, this.cooldownSeconds)
      }      
    } catch (err) { 
      this.logger.error({ err })
      throw err
	  }
  }
  async complete(identifier: string, code: string): Promise<UserResult> {
    const user = await this.authRepository.getUser(identifier)
    if (user && !user.isEnabled) {
      return { status: 'invalidRequest' }
    }
    try {
      const result = await this.authRepository.verifyCode(identifier, code, this.maxAttempts)
      if (result['status'] == 'welcome') {
        result['user'] = !user ?
          await this.authRepository.createUser(result['code']) : user
      }
      return result
    } catch (err) { 
      this.logger.error({ err })
      throw err
	  }	
  }
}