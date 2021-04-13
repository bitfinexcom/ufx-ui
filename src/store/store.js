import { ConnectedRouter } from 'connected-react-router'
import React, {
  createContext, useContext,
} from 'react'
import { Provider } from 'react-redux'

import { initialiseI18n } from '../i18n'
import enTrans from '../locales/en.json'
import getStore, { history } from '../redux/store'

const StoreContext = createContext({})

export const StoreProvider = ({ value, children }) => {
  const {
    translations = {},
    lang,
    addReduxAndRouterProvider = false,
  } = value || {}

  const resources = {
    en: enTrans, // default translations
    ...translations, // add or overwrite with user provided translations
  }

  initialiseI18n(lang, resources)

  const content = (
    <StoreContext.Provider value={value || {}}>
      {children}
    </StoreContext.Provider>
  )

  if (addReduxAndRouterProvider) {
    return (
      <Provider store={getStore()}>
        <ConnectedRouter history={history}>

          {content}
        </ConnectedRouter>
      </Provider>
    )
  }

  return content
}

export const useStore = () => useContext(StoreContext)
