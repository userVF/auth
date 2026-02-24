export default async function(request) {
  this.pageContext = {
    lang: request.params.lang,
    view: request.routeOptions.config.view,    
    params: request.params,
    path: request.url,
    auth: {
      group: request.session.user.group,
    }
  }
}