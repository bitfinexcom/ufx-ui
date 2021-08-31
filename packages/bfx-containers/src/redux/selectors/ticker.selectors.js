import { firstInPair } from '@ufx-ui/utils'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _keys from 'lodash/keys'
import { createSelector } from 'reselect'

import { getUfxState } from './common'
import {
  getIsPaperCcy,
  getIsTradingPair,
  getIsReadonlyCurrency,
  getIsSecuritiesPair,
} from './currencies.selectors'
import { getUIIsPaperTrading } from './UI.selectors'

const EMPTY_OBJ = {}
const EMPTY_ARR = []

export const getTickers = (state) => _get(getUfxState(state), 'ticker', EMPTY_OBJ)

// symbol : ticker symbol/key i.e. tBTCUSD, TDUSK:USD, tXAUT:UST
export const getTicker = createSelector(
  getTickers,
  (tickers) => symbol => tickers[symbol] || EMPTY_OBJ,
)

export const getTradingTickerKeys = createSelector(
  getTickers,
  getIsTradingPair,
  getIsSecuritiesPair,
  getUIIsPaperTrading,
  getIsPaperCcy,
  getIsReadonlyCurrency,
  (tickers, isTradingPair, isSecuritiesPair, isPaperTrading, isPaperCcy, isReadonlyCcy) => {
    if (_isEmpty(tickers)) {
      return EMPTY_ARR
    }

    return _keys(tickers).filter(symbol => {
      const ccy = firstInPair(symbol)

      return isTradingPair(symbol) && !isReadonlyCcy(symbol) && !isSecuritiesPair(symbol)
      && ((isPaperTrading && isPaperCcy(ccy)) || (!isPaperTrading && !isPaperCcy(ccy)))
    })
  },
)

export default {
  getTickers,
  getTicker,
}
