import fp from 'fastify-plugin'

export default fp(async function(app) {   

  app.decorateRequest('session', null)
  app.decorateRequest('sessionParams', null)

  app.addHook('onRequest', async function(request, reply) {

    const sessionParams = {
      lang: this.langConfig.allowed.includes(request.params.lang) ? 
        request.params.lang : this.langConfig.default,
      keepLang: request.params.lang ?
        false : true,
      ip: request.headers['x-real-ip'] || '127.0.0.1', 
      path: request.url, 
      ua: request.headers['user-agent'],
      redirectPath: request.routeOptions.config?.keepRedirect ? 
        request.url.replace('/api/', '/') : '',
      keepRedirectPath: request.routeOptions.config?.keepRedirectPath ? 
        true : false,
    }
    request.sessionParams = sessionParams

    const cookieSessionId = request.cookies?.sessionId
    if (!cookieSessionId) {
      const guestSession = await app.sessionService.guest(sessionParams)
      request.session = guestSession.session
      return
    }
    
    const {valid: isValidCookie, value: unsignedSessionId} = reply.unsignCookie(cookieSessionId)
    if (!isValidCookie) {
      this.log.error(`Wrong cookie sign: ${unsignedSessionId}`)
      return reply.code(400).send()
    }
    
    const touchSession =  await app.sessionService.touch(unsignedSessionId, sessionParams)
    if (touchSession) {
      request.session = touchSession.session
      return
    }

    const guestSession = await app.sessionService.guest(sessionParams)
    request.session = guestSession.session

  })

  app.addHook('onSend', async function(request, reply) {
    if (request.session?.id) {
      reply.cookie('sessionId', request.session.id)
    }
  })

})