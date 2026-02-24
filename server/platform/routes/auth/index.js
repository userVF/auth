import { loginInitSchema, loginCompleteSchema } from '../../utils/schemas.js'

import loggedInRedirect from '../../hooks/auth/loggedin-redirect.js'
import loggedOutRedirect from '../../hooks/auth/loggedout-redirect.js'
import loggedInReply from '../../hooks/auth/loggedin-reply.js'
import pageContext from '../../hooks/page-context.js'
import langRedirect from '../../hooks/lang-redirect.js'
import loginValidation from '../../hooks/auth/login-validation.js'

export default async function(app) {

  app.route({
    method: 'GET',
    url: '/:lang/login',
    config: { view: 'Login', keepRedirectPath: true },
    onRequest: [langRedirect, loggedInRedirect],
    preHandler: pageContext,
    async handler(request, reply) {
      const { header, login: { head, login }, footer } = app.i18n.get(
        request.params.lang, [ 'header', 'login', 'footer' ]
      )
      const html = await app.getHtml({
        context: app.pageContext, head,
        data: { header, login, footer }
      })
      return reply.type('text/html').send(html)
    },
  })

  app.route({
    method: 'POST',
    url: '/:lang/api/login/init',
    config: { keepRedirectPath: true },
    schema: loginInitSchema,
    attachValidation: true,
    onRequest: loggedInReply,
    preHandler: loginValidation,
    async handler(request, reply) {
      const { identifier, channel } = request.body
      const { loginApi: i18n } = app.i18n.get(request.params.lang, ['loginApi'])      
      let initResult = { status: '', message: '', retryAfter: {}, code: null }
      try {
        initResult = {//invalidRequest | new | update | cooldown
          ...initResult, ...await app.authService.init(identifier) 
        }
        if (['new', 'update'].includes(initResult.status)) {
          const payload = { lang: request.params.lang, code: initResult.code.code }
          initResult = {//invalidRequest | sent | notSent
            ...initResult, 
            ...await app.notificationService.send(identifier, channel, payload) 
          }
        } 
        //invalidRequest | cooldown | sent | notSent
        initResult.message = i18n[initResult.status]
      } catch (err) {
        initResult.status = 'initError'
        initResult.message = i18n['error']
      } finally {
        delete initResult.code
        return reply.send(initResult)
      }
    },
  })
  app.route({
    method: 'POST',
    url: '/:lang/api/login/complete',
    config: { keepRedirectPath: true },
    schema: loginCompleteSchema,
    attachValidation: true,
    onRequest: loggedInReply,
    preHandler: loginValidation,
    async handler(request, reply) {      
      const { identifier, code } = request.body
      const { loginApi: i18n } = app.i18n.get(request.params.lang, ['loginApi'])
      let completeResult = { status: '', message: '', code: null, user: null, session: null }            
      try {
        completeResult = {//invalidRequest | expiredCode | invalidCode | welcome
          ...completeResult, ...await app.authService.complete(identifier, code) 
        }
        if (['welcome'].includes(completeResult.status)) {
          completeResult = { 
            ...completeResult, 
            ...await app.sessionService.login(completeResult.user, request.sessionParams) 
          }
          completeResult.redirectPath = request.session.redirectPath || `/${request.params.lang}`
          request.session = completeResult.session
        }
        //invalidRequest | expiredCode | invalidCode | welcome
        completeResult.message = i18n[completeResult.status]
      } catch (err) {
        completeResult.status = 'completeError'
        completeResult.message = i18n['error']
      } finally {      
        delete completeResult.code
        delete completeResult.user
        delete completeResult.session
        return reply.send(completeResult)
      }
    },
  })
  
  app.route({
    method: 'GET',
    url: '/:lang/logout',
    onRequest: [langRedirect, loggedOutRedirect],
    async handler(request, reply) {
      await app.sessionService.logout(request.session.id, request.sessionParams)           
      return reply.redirect(`/${request.params.lang}`)     
    },
  })
}