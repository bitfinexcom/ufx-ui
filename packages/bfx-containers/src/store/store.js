import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { Provider } from 'react-redux'

import getStore, { history } from '../redux/store'

const ReduxStoreProvider = ({ children }) => (
  <Provider store={getStore()}>
    <ConnectedRouter history={history}>
      {children}
    </ConnectedRouter>
  </Provider>
)

export default ReduxStoreProvider
