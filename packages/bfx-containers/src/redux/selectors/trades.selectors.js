import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _values from 'lodash/values'
import { createSelector } from 'reselect'

import { SUBSCRIPTION_CONFIG } from '../constants/trades.constants'
import { getUfxState } from './common'
import { getWSChannels, findMatchingChannelWithSymbol } from './ws.selectors'

const EMPTY_OBJ = {}

export const getTrades = (state) => _get(getUfxState(state), 'trades', EMPTY_OBJ)

export const getTradesChannel = createSelector(
  [
    getWSChannels,
    (_, symbol) => symbol,
  ],
  (wsChannels, symbol) => findMatchingChannelWithSymbol(wsChannels, {
    ...SUBSCRIPTION_CONFIG,
    symbol,
  }),
)

// symbol : ticker symbol/key i.e. tBTCUSD, TDUSK:USD, tXAUT:UST
export const getTradeForSymbol = createSelector(
  [
    getTrades,
    getTradesChannel,
  ],
  (trades, tradesChannel) => {
    const chanId = _get(tradesChannel, 'chanId')

    return _get(trades, [chanId], EMPTY_OBJ)
  },
)

export const isSubscribedToTrades = createSelector(
  getTradesChannel,
  (channel) => !_isEmpty(channel),
)

export const hasFetchedTrades = (state, symbol) => !_isEmpty(getTradeForSymbol(state, symbol))

export const getRecentTrades = createSelector(
  [getTradeForSymbol],
  (trades) => {
    if (!trades) {
      return undefined // loading state
    }

    return _values(trades).reverse()
  },
)

export default {
  getTrades,
  getRecentTrades,
  hasFetchedTrades,
  getTradeForSymbol,
}
