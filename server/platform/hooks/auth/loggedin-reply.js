export default async function(request, reply) {
  const isLoggedIn = request.session.user.group !== 'guest'
  if (isLoggedIn) {
    return reply.code(400).send()
  }
}