import _get from 'lodash/get'
import _isUndefined from 'lodash/isUndefined'
import _values from 'lodash/values'
import { createSelector } from 'reselect'

import { getUfxState } from './common'

const EMPTY_OBJ = {}

export const getTrades = (state) => _get(getUfxState(state), 'trades', EMPTY_OBJ)

// symbol : ticker symbol/key i.e. tBTCUSD, TDUSK:USD, tXAUT:UST
export const getTrade = createSelector(
  [
    getTrades,
    (_, symbol) => symbol,
  ],
  (trades, symbol) => (
    trades[symbol]
  ),
)

export const hasFetchedTrades = (state, symbol) => !_isUndefined(getTrade(state, symbol))

export const getRecentTrades = createSelector(
  [getTrade],
  (trades) => {
    if (!trades) {
      return undefined // loading state
    }
    return _values(trades).reverse()
  },
)

export default {
  getTrades,
  getTrade,
  getRecentTrades,
}
