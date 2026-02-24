import loggedOutRedirect from '../../../../hooks/auth/loggedout-redirect.js'

export default async function (app) {

  app.route({
    method: 'GET',
    url: '/profile',
    config: { view: 'Profile', keepRedirect: true },
    onRequest: loggedOutRedirect,
    async handler(request, reply) {
      const { header, profile: { head, profile }, footer } = app.i18n.get(
        request.params.lang, ['header', 'profile', 'footer']
      )
      profile.user = request.session.user
      const html = await app.getHtml({
        context: app.pageContext, head,
        data: { header, profile, footer }
      })
      return reply.type('text/html').send(html)
    },
  })
  
}