import {
  put, call, delay, debounce,
} from 'redux-saga/effects'

import { getList } from '../../api/ticker'
import logger from '../../functions/logger'
import { TICKER_INTERVAL } from '../../var/config'
import types from '../constants/ticker.constants'

function* processTickersRequest({ payload }) {
  try {
    const { status, data } = yield call(getList, payload)

    if (status === 200) {
      yield put({
        type: types.FETCH_ALL_TICKERS_SUCCESS,
        payload: data,
      })
    }
  } catch (e) {
    logger.error(e)
  }
}

function* fetchTickersPeriodically({ payload }) {
  while (true) {
    yield call(processTickersRequest, { payload })
    yield delay(TICKER_INTERVAL)
  }
}

function* tickersSaga() {
  yield debounce(500, types.FETCH_ALL_TICKERS_PERIODICALLY, fetchTickersPeriodically)
}

export default tickersSaga
