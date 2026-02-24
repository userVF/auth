export default async function(request, reply) {
  const isLoggedIn = request.session.user.group !== 'guest'
  if (isLoggedIn) {
    return reply.redirect(`/${request.params.lang}`)
  }
}