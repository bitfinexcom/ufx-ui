import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _values from 'lodash/values'
import { createSelector } from 'reselect'

import { SUBSCRIPTION_CONFIG } from '../constants/trades.constants'
import { getUfxState } from './common'
import { getWSChannels, findMatchingChannel } from './ws.selectors'

const EMPTY_OBJ = {}

export const getTrades = (state) => _get(getUfxState(state), 'trades', EMPTY_OBJ)

// symbol : ticker symbol/key i.e. tBTCUSD, TDUSK:USD, tXAUT:UST
export const getTradeForChannelID = createSelector(
  [
    getTrades,
    getWSChannels,
    (_, symbol) => symbol,
  ],
  (trades, wsChannels, symbol) => {
    const tradesChannel = findMatchingChannel(wsChannels, {
      ...SUBSCRIPTION_CONFIG,
      symbol,
    })
    const chanId = _get(tradesChannel, 'chanId')

    return _get(trades, [chanId], EMPTY_OBJ)
  },
)

export const hasFetchedTrades = (state, symbol) => !_isEmpty(getTradeForChannelID(state, symbol))

export const getRecentTrades = createSelector(
  [
    getTradeForChannelID,
    (_, symbol) => symbol,
  ],
  (trades, symbol) => {
    if (!trades) {
      return undefined // loading state
    }

    return _values(trades[symbol]).reverse()
  },
)

export default {
  getTrades,
  getRecentTrades,
  hasFetchedTrades,
  getTradeForChannelID,
}
