export default async function(app) {

  app.get('/profile', { 
    config: { keepRedirect: true },
  }, request => {
    const { profile: { head, profile } } = app.i18n.get(
      request.params.lang, [ 'profile' ]
    )
    profile.user = request.session.user
    return { head, profile }
  })
}