import fp from 'fastify-plugin'

import { SessionRepository } from '../../adapters/session/SqliteSessionRepository.ts'
import { SessionService } from '../../services/session/SessionService.ts'

export default fp(async function(app) {
  const sessionRepository = new SessionRepository()
  const sessionService = new SessionService(app.log, sessionRepository)
  app.decorate('sessionService', sessionService)
})