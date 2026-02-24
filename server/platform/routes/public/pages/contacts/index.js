export default async function(app) { 

  app.route({
    method: 'GET',
    url: '/:lang/contacts',
    config: { view: 'Contacts'},
    async handler(request, reply) {
      const { header, contacts: { head, contacts }, footer } = app.i18n.get(
        request.params.lang, ['header', 'contacts', 'footer']
      )
      const html = await app.getHtml({
        context: app.pageContext, head,
        data: { header, contacts, footer }
      })
      return reply.type('text/html').send(html)
    },
  })
  
}