import langRedirect from '../../../hooks/lang-redirect.js'
import pageContext from '../../../hooks/page-context.js'

export default function (app) {

  app.addHook('onRequest', langRedirect)
  app.addHook('preHandler', pageContext)

}