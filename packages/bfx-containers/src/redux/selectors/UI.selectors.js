import {
  PAIR_URL_SEPARATOR,
  PAIR_OUTPUT_SEPARATOR,
  book,
} from '@ufx-ui/utils'
import _find from 'lodash/find'
import _get from 'lodash/get'
import _includes from 'lodash/includes'
import _isString from 'lodash/isString'
import _keys from 'lodash/keys'
import { createSelector } from 'reselect'

import { getUfxState } from './common'
import {
  getCurrenciesInfo, getIsPaperCcy, getPairsInfo, getCurrencySymbolMemo,
} from './currencies.selectors'
import { depthChart } from '../../var/config'
import {
  LAST_PRICE_REQ,
  IS_MARKET_TRADES,
  BOOK_PREC,
  BOOK_ZOOM,
  DEPTH_CHART_ZOOM,
} from '../constants/UI.constants'

export const VERIFICATION_LEVEL = {
  NONE: 0,
  BASIC: 1,
  INTERMEDIATE: 2,
  FULL: 3,
}

const EMPTY_OBJ = {}

export const getUI = (state) => _get(getUfxState(state), 'UI', EMPTY_OBJ)

export const getUIIsPaperTrading = (state) => getUI(state).isPaperTrading || false

export const getUIOrderform = (state) => getUI(state).orderform

export const getUIOrderformPrice = (state) => _get(getUIOrderform(state), LAST_PRICE_REQ)

export const getUIIsMarketTrades = (state) => _get(getUI(state), IS_MARKET_TRADES)

export const getUIBookPrec = (state) => _get(getUI(state), BOOK_PREC, 0)

export const getUIBookZoom = (state) => _get(getUI(state), BOOK_ZOOM, book.DEFAULT_ZOOM)

export const getUIDepthChartZoom = (state) => _get(getUI(state), DEPTH_CHART_ZOOM, depthChart.DEFAULT_ZOOM)

export const getUIAllPairs = (state) => getUI(state).all_pairs || []

export const getUIAllCurrencies = (state) => getUI(state).all_currencies || []

export const getUrlPair = (state) => getUI(state).currentPair

export const getNicePair = createSelector(
  getUrlPair,
  getCurrencySymbolMemo,
  (pair, getCcySymbol) => {
    if (!_isString(pair)) {
      return ''
    }

    const [baseCcy, quoteCcy] = pair.split(PAIR_URL_SEPARATOR)

    return getCcySymbol(baseCcy) + PAIR_OUTPUT_SEPARATOR + getCcySymbol(quoteCcy)
  },
)

export const getUIUserVerified = (state) => getUI(state).verified || false

export const getUIUserVerificationLevel = (state) => (
  getUIUserVerified(state)
    ? Number(getUI(state).verificationLevel || VERIFICATION_LEVEL.NONE)
    : VERIFICATION_LEVEL.NONE
)
export const isUserVerifiedFull = (state) => (
  getUIUserVerificationLevel(state) >= VERIFICATION_LEVEL.FULL
)
export const isUserVerifiedIntermediate = (state) => (
  getUIUserVerificationLevel(state) >= VERIFICATION_LEVEL.INTERMEDIATE
)
export const isUserVerifiedBasic = (state) => (
  getUIUserVerificationLevel(state) >= VERIFICATION_LEVEL.BASIC
)

export const getUIWithdrawalsMaxLnx = () => 0.02
export const getUIWithdrawalsMinLnx = () => 0.000001

export const getUIWalletNames = (state) => getUI(state).wallet_ui_names || {}

export const getUITradingCurrencies = createSelector(
  [getUIIsPaperTrading, getCurrenciesInfo, getPairsInfo, getIsPaperCcy, getCurrencySymbolMemo],
  (isPaperTrading, currenciesInfo, pairsInfo, isPaperCcy, getCurrencySymbol) => {
    const currencies = _keys(currenciesInfo)
    if (!isPaperCcy) {
      return currencies
    }

    const getIsExchangeSymbol = (ccy) => _find(pairsInfo, (value, key) => _includes(key, ccy) && value.exchange)

    const ccyObject = { }
    currencies.forEach((ccy) => {
      if (
        ((isPaperTrading && isPaperCcy(ccy))
        || (!isPaperTrading && !isPaperCcy(ccy))) && getIsExchangeSymbol(ccy)
      ) {
        ccyObject[ccy] = {
          name: getCurrencySymbol(ccy),
          currency: ccy,
        }
      }
    })

    return ccyObject
  },
)

export default {
  getUIIsPaperTrading,
  getUIOrderformPrice,
  getUIAllPairs, // TODO
  getUIAllCurrencies, // TODO
  getUrlPair,
  getNicePair,
  getUIIsMarketTrades,
  getUIBookPrec,
  getUIUserVerified,
  getUIWalletNames,
}
