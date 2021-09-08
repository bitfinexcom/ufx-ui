import React, {
  createContext, useContext,
} from 'react'

import { initialiseI18n } from './i18n'
import cnTrans from './locales/cn.json'
import enTrans from './locales/en.json'
import esTrans from './locales/es.json'
import ruTrans from './locales/ru.json'
import trTrans from './locales/tr.json'
import twTrans from './locales/tw.json'

const StoreContext = createContext({})

export const StoreProvider = ({ value, children }) => {
  const {
    translations = {},
    lang,
  } = value || {}

  const resources = {
    en: enTrans, // default translations
    ru: ruTrans,
    es: esTrans,
    cn: cnTrans,
    tw: twTrans,
    tr: trTrans,
    ...translations, // add or overwrite with user provided translations
  }

  initialiseI18n(lang, resources)

  return (
    <StoreContext.Provider value={value || {}}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
