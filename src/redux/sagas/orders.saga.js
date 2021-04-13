import _get from 'lodash/get'
import { takeLatest, put, call } from 'redux-saga/effects'

import { getOrderHistory } from '../../api/order'
import logger from '../../functions/logger'
import { setOrderHistory } from '../actions/orders.actions'
import { WSSend } from '../actions/ws.actions'
import types from '../constants/orders.constants'

// symbol : ticker symbol/key i.e. tBTCUSD, TDUSK:USD, tXAUT:UST
function* processOrderHistoryRequest({ payload }) {
  try {
    const { symbol = '', params } = payload || {}
    const section = (symbol)
      ? `${symbol}/`
      : ''

    const { status, data } = yield call(getOrderHistory, section, params)

    if (status === 200) {
      yield put(setOrderHistory(data, { symbol }))
    }
  } catch (e) {
    logger.error(e)
  }
}

function* processCancelOrder(action) {
  const orderId = _get(action, ['payload', 'orderId'])
  const send = WSSend([0, 'oc', null, { id: Number(orderId) }])

  yield put(send)
}

function* processSubmitOrder(action) {
  const { payload } = action
  const send = WSSend([0, 'on', null, payload])

  yield put(send)
}

function* tradesSaga() {
  yield takeLatest(types.FETCH_ORDER_HISTORY, processOrderHistoryRequest)
  yield takeLatest(types.CANCEL_ORDER, processCancelOrder)
  yield takeLatest(types.SUBMIT_ORDER, processSubmitOrder)
}

export default tradesSaga
