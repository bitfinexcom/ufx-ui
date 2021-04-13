import _get from 'lodash/get'
import { createSelector } from 'reselect'

import { getUfxState } from './common'

const EMPTY_OBJ = {}
const DEFAULT_MIN_ORDER_SIZE = 0.001

export const getSymbols = (state) => _get(getUfxState(state), 'symbols', EMPTY_OBJ)

// symbol : ticker symbol/key i.e. tBTCUSD, TDUSK:USD, tXAUT:UST
export const getSymbol = createSelector(
  [
    getSymbols,
    (_, symbol) => symbol,
  ],
  (symbols, symbol) => (
    _get(symbols, symbol, EMPTY_OBJ)
  ),
)

export const getSymbolMinOrderSize = (state, symbol) => Number(_get(getSymbol(state, symbol), 'minSize', DEFAULT_MIN_ORDER_SIZE))
