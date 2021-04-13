import _isArray from 'lodash/isArray'
import {
  select,
  put,
  actionChannel,
  take,
  call,
  fork,
} from 'redux-saga/effects'

import { getSymbols } from '../../functions/format'
import { notifications as config } from '../../var/config'
import { updateUiInvoice } from '../actions/movements.actions'
import { notify } from '../actions/notifications.actions'
import NAdapter from '../adapters/notifications.adapter'
import wsTypes from '../constants/ws.constants'
import { getCurrencySymbol } from '../selectors/currencies.selectors'
import {
  getUIAllPairs,
  getUIAllCurrencies,
} from '../selectors/UI.selectors'

const DEPOSIT_COMPLETE = /deposit_complete/

function* cleanCcysPairs(msg) {
  let cleanMsg = msg

  // clean pairs if msg potentially contains one
  if (msg.match(/[A-Z]{6}/)) {
    const pairs = yield select(getUIAllPairs)
    // eslint-disable-next-line no-restricted-syntax
    for (const pair of pairs) {
      const [first, second] = getSymbols(pair)
      cleanMsg = cleanMsg.replace(pair, `${first}/${second}`)
    }
  }

  // clean currencies if msg potentially contains one
  if (msg.match(/[A-Z]{3,4}/)) {
    const currencies = yield select(getUIAllCurrencies)
    // eslint-disable-next-line no-restricted-syntax
    for (const ccy of currencies) {
      const symbol = (yield select(getCurrencySymbol))(ccy)
      cleanMsg = cleanMsg.replace(ccy, symbol)
    }
  }

  return cleanMsg
}

function* prepareMessage(msg) {
  let str = yield cleanCcysPairs(msg)

  // Add ending period to message if there is no ending punctuation and the
  // message is longer than 4 words.
  if (!(str.match(/(!|\?|\.){1}$/)) && str.split(' ').length >= 4) {
    str += '.'
  }

  // If the first character is a letter, capitalize it
  if (str.charAt(0).match(/[a-z]/)) {
    str = str.charAt(0).toUpperCase() + str.substr(1)
  }

  // Change IOTA to MegaIOTA when it refers to an amount of IOTA
  if (str.match(/\d+\.?\d* IOTA?/)) {
    str = str.replace(/(\d+\.?\d*) (IOTA?)/, '$1 MegaIOTA')
  }

  // Encode HTML entities
  if (str.match(/(>|<)/g)) {
    str = str.replace(/>/g, '&gt;').replace(/</g, '&lt;')
  }

  return str
}

function* onWSNotification(payload = []) {
  if (payload[1] !== 'n' || !_isArray(payload[2])) {
    return
  }

  const notification = payload[2]
  const notiObj = NAdapter(notification)
  const { tag, status } = notiObj

  // skip certain request notifications to avoid having too much similar notifications
  if (config.SKIPPED_NOTIFICATIONS.includes(tag) && status === 'SUCCESS') {
    return
  }

  if (tag === 'wallet_transfer' && status === 'ERROR') {
    // the error is handled via rest call, so skip it
    return
  }

  if (tag.match(DEPOSIT_COMPLETE)) {
    yield put(updateUiInvoice(notification))
    return
  }

  if (notiObj.message) {
    notiObj.message = yield prepareMessage(notiObj.message)
  }

  yield put(notify(notiObj))
}

function* watchWSNotifications() {
  const requestChannel = yield actionChannel(wsTypes.N_MESSAGE)

  while (true) {
    const { payload } = yield take(requestChannel)
    yield call(onWSNotification, payload)
  }
}

function* notificationsSaga() {
  yield fork(watchWSNotifications)
}

export default notificationsSaga
