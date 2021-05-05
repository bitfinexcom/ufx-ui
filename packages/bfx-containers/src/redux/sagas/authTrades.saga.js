import { logger } from '@ufx-ui/utils'
import { takeLatest, put, call } from 'redux-saga/effects'

import { getAuthTradesHistory } from '../../api/trade'
import types from '../constants/authTrades.constants'

function* processTradesRequest({ payload }) {
  try {
    const { symbol } = payload
    const { status, data } = yield call(getAuthTradesHistory, symbol)

    if (status === 200) {
      yield put({
        type: types.FETCH_AUTH_TRADES_HISTORY_SUCCESS,
        payload: data,
        meta: { symbol },
      })
    }
  } catch (e) {
    logger.error(e)
  }
}

function* tradesSaga() {
  yield takeLatest(types.FETCH_AUTH_TRADES_HISTORY, processTradesRequest)
}

export default tradesSaga
