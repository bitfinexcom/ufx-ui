import _get from 'lodash/get'
import _isArray from 'lodash/isArray'

import orderAdapter, { orderListAdapter, orderMapAdapter } from '../adapters/orders.adapter'
import types from '../constants/orders.constants'
import wsTypes from '../constants/ws.constants'

const INITIAL_STATE = {}

const reducer = (state = INITIAL_STATE, action = {}) => {
  const {
    type,
    payload = [],
    meta = {},
  } = action
  const {
    pair = 'all',
  } = meta

  switch (type) {
    case wsTypes.OS_MESSAGE: {
      if (!_isArray(payload)) {
        return state
      }
      const [, , rawData] = payload
      const data = orderMapAdapter(rawData)

      return {
        ...state,
        [pair]: data,
      }
    }

    case wsTypes.OU_MESSAGE:
    case wsTypes.ON_MESSAGE: {
      if (!_isArray(payload)) {
        return state
      }
      const [, , rawData] = payload
      const data = orderAdapter(rawData)

      const order = state.all[data.id]
      const isStatusChanged = order && order.status !== data.status
      const newState = {
        ...state,
        all: {
          ...state.all,
          [data.id]: {
            ...data,
            isStatusChanged,
          },
        },
      }

      return (pair !== 'all')
        ? {
          ...newState,
          [pair]: {
            ...state[pair],
            [data.id]: data,
          },
        }
        : newState
    }

    case types.FETCH_ORDER_HISTORY_SUCCESS: {
      if (!_isArray(payload)) {
        return state
      }
      const orders = orderListAdapter(payload)
      const orderLen = orders.length

      const ordersMap = {}
      for (let i = 0; i < orderLen; i += 1) {
        const order = orders[i]
        ordersMap[order.id] = order
      }

      const currentState = _get(state, `hist_${pair}`, {})
      return {
        ...state,
        [`hist_${pair}`]: {
          ...currentState,
          ...ordersMap,
        },
      }
    }

    case wsTypes.OC_MESSAGE: {
      if (!_isArray(payload)) {
        return state
      }

      const [, , rawData] = payload
      const data = orderAdapter(rawData)
      const { symbol, id } = data

      const allHistory = _get(state, 'hist_all', {})
      const pairHistory = _get(state, `hist_${symbol}`, {})

      const { [id]: omitted, ...allPairOrders } = state[symbol] || {}
      const { [id]: omittedAll, ...allOrders } = state.all || {}

      return {
        ...state,
        hist_all: {
          ...allHistory,
          [id]: data,
        },
        [`hist_${symbol}`]: {
          ...pairHistory,
          [id]: data,
        },
        [symbol]: allPairOrders,
        all: allOrders,
      }
    }

    default:
      return state
  }
}

export default reducer
