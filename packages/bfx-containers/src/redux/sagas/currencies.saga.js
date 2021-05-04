import { logger } from '@ufx-ui/utils'
import { takeLatest, put, call } from 'redux-saga/effects'

import { getConf, getConversions } from '../../api/conf'
import { getSymbolDetails } from '../../api/symbol'
import {
  requestConversionsSuccess,
  requestCurrenciesInfoSuccess,
  requestSymbolDetailsSuccess,
} from '../actions/currencies.actions'
import types from '../constants/currencies.constants'

// order in url is important, the reducer expects: 1.label 2.sym 3.unit
const requests = [
  'pub:map:currency:label',
  'pub:map:currency:sym',
  'pub:map:currency:unit',
  'pub:list:currency:margin',
  'pub:map:currency:pool',
  'pub:map:currency:explorer',
  'pub:map:tx:method',
  'pub:list:pair:exchange',
  'pub:list:pair:margin',
  'pub:list:pair:futures',
  'pub:list:currency:futures',
  'pub:list:currency:paper',
  'pub:list:currency:viewonly',
  'pub:info:tx:status', // [CURRENCY, status_dep, status_wd, null, null, null, null, payment_id_dep, payment_id_wd]
]

export function* requestCurrenciesInfo() {
  try {
    const res = yield call(getConf, requests)
    const action = requestCurrenciesInfoSuccess(res.data)
    yield put(action)
  } catch (e) {
    logger.error(e)
  }
}

export function* requestSymbolDetails() {
  try {
    const { status, data } = yield call(getSymbolDetails)

    if (status === 200) {
      yield put(requestSymbolDetailsSuccess(data))
    }
  } catch (e) {
    logger.error(e)
  }
}

export function* requestConversions() {
  try {
    const { status, data } = yield call(getConversions)

    if (status === 200) {
      yield put(requestConversionsSuccess(data))
    }
  } catch (e) {
    logger.error(e)
  }
}

function* currenciesSaga() {
  yield takeLatest(types.REQUEST_CURRENCIES_INFO, requestCurrenciesInfo)
  yield takeLatest(types.REQUEST_SYMBOL_DETAILS, requestSymbolDetails)
  yield takeLatest(types.REQUEST_CONVERSIONS, requestConversions)
}

export default currenciesSaga
