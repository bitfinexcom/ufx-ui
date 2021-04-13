import isNull from 'lodash/isNull'

import adapter, { snapshot } from '../adapters/candles.adapter'
import types from '../constants/ws.constants'

export function getInitialState() {
  return {}
}

function reducer(state = getInitialState(), action = {}) {
  const { type, payload = [], channel = {} } = action

  switch (type) {
    case types.CANDLES_SNAPSHOT_MESSAGE: {
      if (isNull(payload)) {
        return state
      }
      const [, rawData] = payload
      const { key = '' } = channel
      const data = snapshot(rawData)
      return {
        [key]: data,
      }
    }

    case types.CANDLES_UPDATE_MESSAGE: {
      if (isNull(payload)) {
        return state
      }
      const [, rawData] = payload
      const { key = '' } = channel

      // if there are no trades on the pair, rawData will be empty
      if (!rawData || rawData.length === 0) {
        return state
      }

      const data = adapter(rawData)

      return {
        ...state,
        [key]: {
          ...state[key],
          [data.mts]: data,
        },
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
