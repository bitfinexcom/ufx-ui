import { startsWithFundingPrefix } from '@ufx-ui/utils'
import _forEach from 'lodash/forEach'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'

import { adapterTradingRest, adapterFundingRest } from '../adapters/ticker.adapter'
import types from '../constants/ticker.constants'

export const INITIAL_STATE = {}

const reducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload = [] } = action

  switch (type) {
    case types.FETCH_ALL_TICKERS_SUCCESS: {
      const stateUpdates = {}
      _forEach(payload, (tickerArray) => {
        const symbol = tickerArray[0]
        const restAdapter = (startsWithFundingPrefix(symbol)) ? adapterFundingRest : adapterTradingRest

        const currentCCYTicker = _get(state, symbol, [])
        const nextCCYTicker = restAdapter(tickerArray)

        // deep comparison between curr/next state
        if (!_isEqual(currentCCYTicker, nextCCYTicker)) {
          stateUpdates[symbol] = nextCCYTicker
        }
      })

      if (_isEmpty(stateUpdates)) {
        return state
      }

      return {
        ...state,
        ...stateUpdates,
      }
    }

    default:
      return state
  }
}

export default reducer
