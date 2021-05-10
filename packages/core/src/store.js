import React, {
  createContext, useContext,
} from 'react'

import { initialiseI18n } from './i18n'
import enTrans from './locales/en.json'

const StoreContext = createContext({})

export const StoreProvider = ({ value, children }) => {
  const {
    translations = {},
    lang,
  } = value || {}

  const resources = {
    en: enTrans, // default translations
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
