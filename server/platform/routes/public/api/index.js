export default async function(app) {

  app.get('/home', request => {
    const { home: { head, home } } = app.i18n.get(
      request.params.lang, [ 'home' ]
    )
    // home.data = {
    //   text: 'Main page',
    // }
    return { head, home }
  })

  app.get('/about', request => {
    const { about: { head, about } } = app.i18n.get(
      request.params.lang, [ 'about' ]
    )
    return { head, about }
  })

  app.get('/contacts', request => {
    const { contacts: { head, contacts } } = app.i18n.get(
      request.params.lang, [ 'contacts' ]
    )
    return { head, contacts }
  })

  app.get('/*', async (_request, reply) => {
    return reply.code(404).send()
  })

}