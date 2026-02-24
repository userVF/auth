export default async function (app) {

  app.route({
    method: 'GET',
    url: '/:lang/about',
    config: { view: 'About' },
    async handler(request, reply) {
      const { header, about: { head, about }, footer } = app.i18n.get(
        request.params.lang, ['header', 'about', 'footer']
      )
      const html = await app.getHtml({
        context: app.pageContext, head,
        data: { header, about, footer }
      })
      return reply.type('text/html').send(html)
    },
  })
  
}