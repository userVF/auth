export default async function(request, reply) {
  const isLoggedOut = request.session.user.group === 'guest'
  if (isLoggedOut) {
    return reply.code(403).send()
  }
}