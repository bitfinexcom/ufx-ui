import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import _get from 'lodash/get'
import _throttle from 'lodash/throttle'
import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux'
import { batchedSubscribe } from 'redux-batched-subscribe'
import { createInjectorsEnhancer } from 'redux-injectors'
import createSagaMiddleware from 'redux-saga'

import { setupHttpErrorHandlers } from '../functions/api'
import { isDevelopmentMode } from '../var/config'
import { REDUX_STATE_PREFIX } from './constants/common'
import wsMiddleware from './middleware/ws.middleware'
import authTrades from './reducers/authTrades.reducer'
import balances from './reducers/balances.reducer'
import bookTop from './reducers/book-top.reducer'
import book from './reducers/book.reducer'
import candles from './reducers/candles.reducer'
import conversions from './reducers/conversions.reducer'
import currencies from './reducers/currencies.reducer'
import layouts from './reducers/layouts.reducer'
import movements from './reducers/movements.reducer'
import notifications from './reducers/notifications.reducer'
import orders from './reducers/orders.reducer'
import symbols from './reducers/symbols.reducer'
import ticker from './reducers/ticker.reducer'
import trades from './reducers/trades.reducer'
import UI from './reducers/UI.reducer'
import ws from './reducers/ws.reducer'
import rootSaga from './sagas'

export const history = createBrowserHistory()

const THROTTLE_MILLIS = 350
const throttleOptions = {
  leading: false,
  trailing: true,
}

const batch = _throttle(
  (notify) => notify(),
  THROTTLE_MILLIS,
  throttleOptions,
)

const createReducer = (injectedReducers = {}) => {
  const rootReducer = combineReducers({
    [REDUX_STATE_PREFIX]: combineReducers({
      ...injectedReducers,
      // other common non-injected reducers can go here...
      candles,
      currencies,
      conversions,
      symbols,
      ws,
      notifications,
      UI,
      layouts,
      ticker,
      trades,
      authTrades,
      book,
      bookTop,
      orders,
      balances,
      movements,
    }),
    router: connectRouter(history),
  })

  return rootReducer
}

const getStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const runSaga = sagaMiddleware.run

  const initialState = {}

  // adds redux extension on dev env
  const composeEnhancers = isDevelopmentMode
    ? _get(window, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', compose)
    : compose

  const enhancers = composeEnhancers(
    applyMiddleware(routerMiddleware(history), sagaMiddleware, wsMiddleware()),
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
    batchedSubscribe(batch),
  )

  const store = createStore(
    createReducer(),
    initialState,
    enhancers,
  )

  runSaga(rootSaga)

  setupHttpErrorHandlers(store)

  return store
}

export default getStore
