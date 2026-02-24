export default async function(app) {

  app.route({
    method: 'GET',
    url: '/:lang',
    config: { view: 'Home' },
    async handler(request, reply) {
      const { header, home: { head, home }, footer } = app.i18n.get(
        request.params.lang, ['header', 'home', 'footer']
      )
      const html = await app.getHtml({
        context: app.pageContext, head,
        data: { header, home, footer }
      })
      return reply.type('text/html').send(html)
    },
  })

  app.route({
    method: 'GET',
    url: '/:lang/*',
    config: { view: 'NotFound' },
    async handler(request, reply) {
      const { header,  notFound: { head, notFound }, footer } = app.i18n.get(
        request.params.lang, ['header', 'notFound', 'footer']
      )
      const html = await app.getHtml({
        context: app.pageContext, head,
        data: { header, notFound, footer }
      })
      return reply.code(404).type('text/html').send(html)
    },
  })

}