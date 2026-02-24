export default async function(request, reply) {
  if (request.params.lang != request.session.lang) {
    const segments = request.url.split('/')        
    segments.splice(1, 1, request.session.lang)
    return reply.redirect(`${segments.join('/')}`)
  }
}