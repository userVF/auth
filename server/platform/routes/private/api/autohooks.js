import loggedOutReply from '../../../hooks/auth/loggedout-reply.js'

export default function (app) {

  app.addHook('onRequest', loggedOutReply)

}