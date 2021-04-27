import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'
import _keys from 'lodash/keys'
import size from 'lodash/size'
import _toString from 'lodash/toString'

import { removeOldest } from '../../functions/objects'
import { snapshot } from '../../functions/utils'
import adapter from '../adapters/trades.adapter'
import types from '../constants/ws.constants'

const MAX_TRADES_NUMBER = 24

const INITIAL_STATE = {}

const reducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload = [], channel = {} } = action
  switch (type) {
    // snapshot
    case types.TRADES_SNAPSHOT_MESSAGE: {
      const { symbol = '-' } = channel

      if (!isArray(payload)) {
        return state
      }
      const [chanId, ph1, ph2] = payload
      if (+chanId === 0) {
        return state
      }
      const rawData = isArray(ph1) ? ph1 : ph2

      if (isEmpty(rawData)) {
        return {
          ...state,
          [chanId]: {},
        }
      }

      const opts = { chanId, symbol, code: type }
      const data = snapshot(rawData, adapter, opts)

      return {
        ...state,
        [chanId]: {
          ...data,
        },
      }
    }

    // update, executed
    case types.TE_MESSAGE:
    case types.TU_MESSAGE:
    case types.TRADES_UPDATE_MESSAGE: {
      if (!isArray(payload)) {
        return state
      }
      const [chanId, ph1, ph2] = payload
      const allChanIds = _keys(state)
      if (+chanId === 0 || !allChanIds.includes(_toString(chanId))) {
        return state
      }
      const { symbol = chanId } = channel
      const rawData = isArray(ph1) ? ph1 : ph2

      if (isEmpty(rawData)) {
        return {
          ...state,
          [chanId]: {},
        }
      }
      const data = adapter(rawData, { chanId, type, symbol })
      const { id } = data
      const prev = state[chanId] || {}

      // dont update if te,tu message for same trade
      if (_isEqual(data, prev[id])) {
        return state
      }

      const isUpdate = prev[id]
      const canBeAdded = size(prev) < MAX_TRADES_NUMBER * 2
      const prevData = isUpdate || canBeAdded
        ? prev
        : removeOldest(prev, { max: MAX_TRADES_NUMBER, field: 'mts' })

      return {
        ...state,
        [chanId]: {
          ...prevData,
          [id]: data,
        },
      }
    }

    case types.TRADES_RESET_MESSAGE: {
      return INITIAL_STATE
    }

    default: {
      return state
    }
  }
}

export default reducer
