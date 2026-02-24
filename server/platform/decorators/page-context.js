import fp from 'fastify-plugin'

export default fp(async function(app) {
  app.decorate('pageContext', { 
    lang: '', 
    view: '', 
    params: '', 
    path: '', 
    auth: {
      group: ''
    } 
  })
}, { name: 'pageContext' })