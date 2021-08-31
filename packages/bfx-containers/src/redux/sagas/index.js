import { all } from 'redux-saga/effects'

import bootstrapSaga from './bootstrap.saga'
import currenciesSaga from './currencies.saga'
import notificationsSaga from './notifications.saga'
import tickersSaga from './ticker.saga'
import wsSaga from './ws.saga'

export { wsSaga, tickersSaga, currenciesSaga }

export default function* rootSaga() {
  // add common non-injected sagas here...
  yield all([
    wsSaga(),
    currenciesSaga(),
    bootstrapSaga(),
    notificationsSaga(),
  ])
}
