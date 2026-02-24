import fp from 'fastify-plugin'

import { RecipientRepository } from '../../adapters/notification/RecipientRepository.ts'
import { NotificationService } from '../../services/notification/NotificationService.ts'

export default fp(async function(app) {
  const recipientRepository = new RecipientRepository()
  const notificationService = new NotificationService(app.i18n, app.log, recipientRepository)
  app.decorate('notificationService', notificationService)
})