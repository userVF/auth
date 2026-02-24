import fp from 'fastify-plugin'

import l10n from '../utils/l10n.js'

export default fp(async function(app) {
  app.decorate('i18n', {
    get(lang, items) {
      const result = {}          
      items.forEach(item => {
        result[item] = structuredClone(l10n[lang][item])
      })
      return result
    }
  })
})