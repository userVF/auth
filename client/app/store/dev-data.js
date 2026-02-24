import l10n from  '../../../server/platform/utils/l10n.js'

const lang = 'ru'

export default {
  context: {
    lang,
    // view: 'Login',
    view: 'Home',
    path: `/${lang}`,
    auth: {
      group: 'guest',
    },
  },
  data: {
    header: l10n[lang]['header'],
    // ...l10n[lang]['login'],
    // ...l10n[lang]['home'],
    // ...l10n[lang]['profile'],
    footer: l10n[lang]['footer'],        
  },  
}
