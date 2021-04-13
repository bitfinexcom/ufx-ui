import i18next from 'i18next'

import { isDevelopmentMode } from './var/config'

const DEFAULT_LANG = 'en'

export const i18n = i18next.createInstance()

export const changeLanguage = (lang) => {
  i18n.changeLanguage(lang)
}

export const initialiseI18n = (lang, resources) => {
  const debug = isDevelopmentMode

  const i18nConfig = {
    interpolation: { escapeValue: false }, // React already does escaping
    lng: lang || DEFAULT_LANG, // language to use
    resources,
    debug,
    keySeparator: '.',
  }

  i18n.init(i18nConfig)
}
