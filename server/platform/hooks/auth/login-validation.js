export default async function(request, reply) {
 if (request.validationError) {
    const { loginApi: i18n } = this.i18n.get(request.params.lang, ['loginApi'])
    request.log.warn(request.validationError.validation)
    return reply.send({
      status: 'invalidRequest', 
      message: i18n['invalidRequest'],
    })
  }
}