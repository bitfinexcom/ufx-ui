import { i18n } from '@ufx-ui/core'
import {
  logger, getSymbols, capitalize, isTether, isFiat,
  numberToFiatString, setSigFig,
} from '@ufx-ui/utils'
import _get from 'lodash/get'
import _isArray from 'lodash/isArray'
import _last from 'lodash/last'
import _toString from 'lodash/toString'
import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'

import { notify as notifyAction } from '../actions/notifications.actions'
import orderAdapter from '../adapters/orders.adapter'
import types from '../constants/ws.constants'
import { getCurrencySymbol } from '../selectors/currencies.selectors'
import { getAllOrders } from '../selectors/orders.selectors'

function* toNiceSymbol(symbol) {
  return (yield select(getCurrencySymbol))(symbol)
}

// eslint-disable-next-line consistent-return
const ouMessage = (generateMessage, data = {}) => {
  const {
    amount,
    price,
    lastStatus,
    rightSymbol,
    originalAmount,
    isModified,
  } = data

  if (amount === 0) {
    return {
      level: 'success',
      message: generateMessage([i18n.t('orderform:executed_full')], { showAverage: true }),
    }
  }

  if (amount === originalAmount || isModified) {
    return {
      level: 'success',
      message: [
        i18n.t('common:modified'),
        ...generateMessage(
          [i18n.t('common:at'), setSigFig(price), rightSymbol],
          { showOriginal: false },
        ),
      ],
    }
  }

  if (lastStatus.startsWith('PARTIALLY')) {
    return {
      level: 'success',
      message: generateMessage([lastStatus]),
    }
  }
}

// eslint-disable-next-line consistent-return
const ocMessage = (generateMessage, args = {}) => {
  const { amount, status } = args

  if (status.match(/(CANCELED|RSN_POS_REDUCE_INCR)/)) {
    return {
      message: generateMessage([i18n.t('orderform:was_canceled')], { showOriginal: false }),
    }
  }

  if (amount === 0 && status.match(/EXECUTED/)) {
    return {
      level: 'success',
      message: generateMessage([i18n.t('orderform:executed_full')], { showAverage: true }),
    }
  }
}

const onMessage = (generateMessage, args = {}) => {
  const { price, rightSymbol } = args
  return {
    level: 'success',
    message: [
      i18n.t('common:created'),
      ...generateMessage(
        [i18n.t('common:at'), setSigFig(price), rightSymbol],
        { showOriginal: false },
      ),
    ],
  }
}

function* notify(args = {}) {
  const {
    message,
    level = 'info',
  } = args

  yield put(notifyAction({
    level,
    message: capitalize(message.filter((v) => v).join(' ')),
  }))
}

function* onOrderMessage(args = {}) {
  const {
    type: actionType,
    payload: [,, data],
  } = args

  if (!_isArray(data) || data.length < 2) {
    return
  }

  const {
    id,
    price,
    amount,
    status,
    symbol,
    type: orderType,
    priceAverage,
    originalAmount,
  } = orderAdapter(data)

  const type = orderType.toLowerCase()
  const lastStatus = _last(status.split(',')).trim()
  const [leftSymbol, rightSymbol] = getSymbols(symbol)
  const niceLeftSymbol = yield toNiceSymbol(leftSymbol)
  const niceRightSymbol = yield toNiceSymbol(rightSymbol)

  const generateMessage = (message = [], {
    showOriginal = true,
    showAverage = false,
  } = {}) => [
    type,
    i18n.t(`orderform:${parseFloat(originalAmount) < 0 ? 'sell' : 'buy'}`),
    i18n.t('orderform:order_of'),
    Math.abs(showOriginal ? originalAmount : amount),
    niceLeftSymbol,
    ...message,
    showAverage && priceAverage > 0 && ` at ${
      (isFiat(rightSymbol) || isTether(rightSymbol))
        ? numberToFiatString(priceAverage)
        : setSigFig(priceAverage)
    } ${niceRightSymbol}`,
    `(ID: ${id})`,
  ]

  const orders = yield select(getAllOrders)
  const order = _get(orders, _toString(id))
  const isModified = order && !order.isStatusChanged

  const messageData = {
    amount,
    price,
    status,
    lastStatus,
    rightSymbol: niceRightSymbol,
    priceAverage,
    originalAmount,
    isModified,
  }

  switch (actionType) {
    case types.OU_MESSAGE: {
      yield notify(ouMessage(generateMessage, messageData))
      return
    }

    case types.OC_MESSAGE: {
      yield notify(ocMessage(generateMessage, messageData))
      return
    }

    case types.ON_MESSAGE: {
      yield notify(onMessage(generateMessage, messageData))
      return
    }

    default: {
      logger.warn('Unhandled order type for notifications', actionType)
    }
  }
}

export function* orderNotificationsSaga() {
  yield takeEvery([
    types.OU_MESSAGE,
    types.OC_MESSAGE,
    types.ON_MESSAGE,
  ], onOrderMessage)
}

export default orderNotificationsSaga
