import fp from 'fastify-plugin'

import { AuthRepository } from '../../adapters/auth/SqliteAuthRepository.ts'
import { AuthService } from '../../services/auth/AuthService.ts'

export default fp(async function(app) {
  const authRepository = new AuthRepository()
  const authService = new AuthService(app.log, authRepository)
  app.decorate('authService', authService)
})