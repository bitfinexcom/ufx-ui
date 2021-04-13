import _isEmpty from 'lodash/isEmpty'
import _isNull from 'lodash/isNull'
import _size from 'lodash/size'

import { removeOldest } from '../../functions/objects'
import { snapshot } from '../../functions/utils'
import adapter from '../adapters/authTrades.adapter'
import authTypes from '../constants/authTrades.constants'
import types from '../constants/ws.constants'

const MAX_TRADES_NUMBER = 24

const INITIAL_STATE = { }

const reducer = (state = INITIAL_STATE, action = {}) => {
  const {
    type,
    meta = {},
    payload = [],
  } = action
  // NOTE chanId 0 has no symbol attribute,
  // symbol must be obtained from message pair field

  switch (type) {
    case authTypes.FETCH_AUTH_TRADES_HISTORY_SUCCESS: {
      const { symbol } = meta

      const data = snapshot(payload, adapter)
      return {
        ...state,
        [symbol]: data,
      }
    }

    // updates
    case types.TE_MESSAGE:
    case types.TU_MESSAGE: {
      if (_isNull(payload)) {
        return state
      }
      const [chanId, , rawData] = payload
      if (+chanId !== 0 || _isEmpty(rawData)) {
        return state
      }
      const data = adapter(rawData)
      const { id, pair, symbol } = data
      const s = symbol || pair

      const prev = state[s] || {}
      const isUpdate = prev[id]
      const canBeAdded = (_size(prev) < MAX_TRADES_NUMBER * 2)
      const prevData = (isUpdate || canBeAdded)
        ? prev
        : removeOldest(prev, { max: MAX_TRADES_NUMBER, field: 'mts' })

      return {
        ...state,
        [s]: {
          ...prevData,
          [id]: data,
        },
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
