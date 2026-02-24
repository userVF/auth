import fp from 'fastify-plugin'

export default fp(async function(app) {
  app.decorate('langConfig', { default: 'en', allowed: ['en', 'kz', 'ru'] })
}, { name: 'langConfig' })