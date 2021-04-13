import _get from 'lodash/get'
import _isUndefined from 'lodash/isUndefined'
import _values from 'lodash/values'
import { createSelector } from 'reselect'

import { getUfxState } from './common'

const EMPTY_OBJ = {}

const getAuthTrades = (state) => _get(getUfxState(state), 'authTrades', EMPTY_OBJ)

// symbol : ticker symbol/key i.e. tBTCUSD, TDUSK:USD, tXAUT:UST
export const getAuthTrade = createSelector(
  [getAuthTrades, (_, symbol) => symbol],
  (authTrades, symbol) => (
    authTrades[symbol]
  ),
)

export const hasFetchedAuthTrades = (state, symbol) => !_isUndefined(getAuthTrade(state, symbol))

export const getRecentAuthTrades = createSelector(
  getAuthTrade,
  (authTrade) => {
    if (!authTrade) {
      return undefined // loading state
    }
    return _values(authTrade).reverse()
  },
)
