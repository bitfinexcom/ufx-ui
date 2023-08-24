import {
  removePrefix,
  firstInPair,
  lastInPair,
  startsWithAPrefix,
  FUNDING_PREFIX,
  TRADING_PREFIX,
  isPair,
  PAIR_URL_SEPARATOR,
} from '@ufx-ui/utils'
import _filter from 'lodash/filter'
import _flow from 'lodash/flow'
import _get from 'lodash/get'
import _includes from 'lodash/includes'
import _keys from 'lodash/keys'
import _memoize from 'lodash/memoize'
import _pickBy from 'lodash/pickBy'
import _reduce from 'lodash/reduce'
import _toUpper from 'lodash/toUpper'
import _uniq from 'lodash/uniq'
import { createSelector } from 'reselect'

import { getUfxState } from './common'
import {
  CURRENCY_LABEL,
  CURRENCY_SYMBOL,
  CURRENCY_POOL,
  CURRENCY_TX_METHOD,
} from '../constants/currencies.constants'

const EMPTY_OBJ = {}

const getReducer = (state) => _get(getUfxState(state), 'currencies', EMPTY_OBJ)
export const getCurrenciesInfo = (state) => getReducer(state).currenciesInfo
const getCurrenciesSymbolMap = (state) => getReducer(state).currencySymbolToCurrencyCodeMap
const getTxMethods = (state) => getReducer(state).txMethods
export const getPairsInfo = (state) => getReducer(state).pairsInfo
export const getTetherProtocolToCcyMapping = (state) => getReducer(state).tetherProtocolToCurrencyMapping

export const getCurrencyInfoMemo = createSelector(
  getCurrenciesInfo,
  (currenciesInfo) => (currency, fieldName, defaultValue) => {
    const currencyInfo = _get(currenciesInfo, currency)
    if (!currencyInfo) {
      return defaultValue
    }
    return _get(currencyInfo, fieldName, defaultValue)
  },
)

export const getCurrencyLabel = createSelector(
  getCurrencyInfoMemo,
  (currencyInfo) => _memoize((ccy) => currencyInfo(ccy, CURRENCY_LABEL, ccy)),
)

export const getCurrencySymbolMemo = createSelector(
  getCurrencyInfoMemo,
  (currencyInfo) => _memoize((ccy) => currencyInfo(ccy, CURRENCY_SYMBOL, ccy)),
)

export const getCurrencySymbolReselect = createSelector(
  getCurrenciesInfo,
  (currenciesInfo) => (ccy, defaultValue = ccy) => (
    _get(currenciesInfo, [_toUpper(ccy), 'sym'], defaultValue)
  ),
)

export const getIsTradingPair = createSelector(
  getPairsInfo,
  (pairsInfo) => (
    pairsInfo
      ? (pair) => _get(pairsInfo[removePrefix(pair)], 'exchange', false)
      : () => null
  ),
)

export const getIsDerivativePair = createSelector(
  getPairsInfo,
  (pairsInfo) => (
    pairsInfo
      ? (pair) => _get(pairsInfo[removePrefix(pair)], 'derivative', false)
      : () => null
  ),
)

export const getIsSecuritiesPair = createSelector(
  getPairsInfo,
  (pairsInfo) => (
    pairsInfo
      ? (pair) => _get(pairsInfo[removePrefix(pair)], 'securities', false)
      : () => null
  ),
)

export const getIsPaperCcy = createSelector(
  getCurrenciesInfo,
  (currenciesInfo) => (
    currenciesInfo
      ? (ccy) => {
        const res = _get(currenciesInfo, [_toUpper(ccy), 'paper'], false)
        return res
      }
      : () => null
  ),
)

export const getAllPaperCurrencies = createSelector(
  getCurrenciesInfo,
  (currenciesInfo) => _keys(_pickBy(currenciesInfo, (ccy) => ccy.paper)),
)

export const getIsFundingCcy = createSelector(
  getCurrenciesInfo,
  (ccysInfo) => (
    ccysInfo
      ? (ccy) => _get(ccysInfo, [removePrefix(ccy), 'funding'], false)
      : () => null
  ),
)

// obtains a symbol from a given pair with the corresponding prefix
// ex. BTCUSD -> tBTCUSD
// ex. USD -> fUSD
// ex. tBTCUSD -> tBTCUSD
// ex. tbtcusd -> tTBTCUSD
// ex. fUSD -> fUSD
// ex. fusd -> fFUSD
export const getAddPrefix = createSelector(
  [getIsFundingCcy],
  (isFundingCcy) => (arg = '') => {
    const input = (arg)
      ? arg.toString()
      : ''

    const symbol = _toUpper(input)
    const restIsUpperCase = (input.substr(1) === symbol.substr(1))

    if (startsWithAPrefix(input) && restIsUpperCase) {
      // no change required
      // ex. tGGGHHH is considered a prefixed symbol --> tGGGHHH
      // ex. tggghhh is considered unprefixed ---------> tTGGGHHH
      // ex. fXYZ    is considered a prefixed symbol --> fXYZ
      // ex. fxyz    is considered unprefixed ---------> fFXYZ
      return input
    }

    if (isFundingCcy(symbol)) {
      return `${FUNDING_PREFIX}${symbol}`
    }

    if (isPair(symbol) || symbol.length === 8) {
      return `${TRADING_PREFIX}${symbol}`
    }

    return symbol
  },
)

export const getCurrencyCodeFromCurrencySymbol = createSelector(
  getCurrenciesSymbolMap,
  (currenciesSymbolMap) => (currencySymbol, defaultValue = currencySymbol) => _get(currenciesSymbolMap, currencySymbol, defaultValue),
)

export const getCurrencySymbol = createSelector(
  getCurrenciesInfo,
  (currenciesInfo) => (ccy, defaultValue = ccy) => (
    _get(currenciesInfo, [_toUpper(ccy), 'sym'], defaultValue)
  ),
)

export const getCurrencyPool = createSelector(
  getCurrenciesInfo,
  (currenciesInfo) => (ccy, defaultValue = ccy) => (
    _get(currenciesInfo, [ccy, CURRENCY_POOL], defaultValue)
  ),
)

// read only currencies are only used for eosfinex
export const getIsReadonlyCurrency = createSelector(
  getCurrenciesInfo,
  (_, pair) => pair,
  (currenciesInfo) => pair => {
    const first = firstInPair(pair, true)
    const last = lastInPair(pair, true)
    const isReadOnly = _get(currenciesInfo, `${first}.readOnly`, false)
      || _get(currenciesInfo, `${last}.readOnly`, false)
    return isReadOnly
  },
)

// Conversion examples:
// IOTA:USD -> IOTUSD
// BTCF0:USDF0 -> BTCF0:USDF0
// IOTA -> IOT
export const getRegularPair = createSelector(
  getIsDerivativePair,
  getCurrencyCodeFromCurrencySymbol,
  (isDerivativePair, getCcyCode) => (pair) => {
    const pairSeparator = isDerivativePair && isDerivativePair(pair)
      ? PAIR_URL_SEPARATOR
      : ''

    const regularPair = pair.split(PAIR_URL_SEPARATOR)
      .map((ccy) => getCcyCode(ccy))
      .join(pairSeparator)

    // if the total length is 6, we assume this is old style pairs
    if (regularPair.length === 6) {
      return regularPair
    }

    // if not, we re-join the pairs with the pair seperator
    return pair.split(PAIR_URL_SEPARATOR)
      .map((ccy) => getCcyCode(ccy))
      .join(PAIR_URL_SEPARATOR)
  },
)

const getTxMethodForCcy = (ccysInfo, ccy) => {
  let txMethod = _get(ccysInfo, [ccy, CURRENCY_TX_METHOD], null)
  if (!txMethod) {
    // try to get txMethod of pool
    const pool = _get(ccysInfo, [ccy, CURRENCY_POOL], null)
    txMethod = _get(ccysInfo, [pool, CURRENCY_TX_METHOD], null)
  }
  return txMethod
}

export const getHasPaymentIdForWithdrawals = createSelector(
  [getCurrenciesInfo, getTxMethods],
  (ccysInfo, txMethods) => (ccy) => {
    const txMethod = getTxMethodForCcy(ccysInfo, ccy)
    return !!_get(txMethods, [txMethod, 'hasPaymentIdForWithdrawals'], false)
  },
)

export const getHasPaymentIdForDeposits = createSelector(
  [getCurrenciesInfo, getTxMethods],
  (ccysInfo, txMethods) => (ccy) => {
    const txMethod = getTxMethodForCcy(ccysInfo, ccy)
    return !!_get(txMethods, [txMethod, 'hasPaymentIdForDeposits'], false)
  },
)

export const getIsDepositActive = createSelector(
  [getCurrenciesInfo, getTxMethods],
  (ccysInfo, txMethods) => (ccy) => {
    const txMethod = getTxMethodForCcy(ccysInfo, ccy)
    return !!_get(txMethods, [txMethod, 'isDepositActive'], false)
  },
)

export const getIsWithdrawalActive = createSelector(
  [getCurrenciesInfo, getTxMethods],
  (ccysInfo, txMethods) => (ccy) => {
    const txMethod = getTxMethodForCcy(ccysInfo, ccy)
    return !!_get(txMethods, [txMethod, 'isWithdrawalActive'], false)
  },
)

export const getCurrencyTxMethod = createSelector(
  getCurrenciesInfo,
  (ccysInfo) => (ccy, defaultValue = ccy) => (
    getTxMethodForCcy(ccysInfo, ccy) || defaultValue
  ),
)

const getCurrenciesSymbolFromTxMethods = (txMethods, includeTether = false) => _flow(
  (data) => _filter(data, (value, key) => (includeTether
    ? _includes(key, 'TETHER')
    : !_includes(key, 'TETHER')
  )),
  (data) => _reduce(
    data,
    (acc, txMethod) => [...acc, ...(txMethod?.symbol || [])],
    [],
  ),
  (data) => _uniq(data),
)(txMethods)

export const getCryptoCurrencies = createSelector(
  getTxMethods,
  (txMethods) => getCurrenciesSymbolFromTxMethods(txMethods),
)

export const getTetherCurrencies = createSelector(
  getTxMethods,
  (txMethods) => getCurrenciesSymbolFromTxMethods(txMethods, true),
)

export default {
  getIsTradingPair,
  getIsDerivativePair,
  getIsFundingCcy,
  getIsReadonlyCurrency,
  getCurrencyCodeFromCurrencySymbol,
  getRegularPair,
  getHasPaymentIdForDeposits,
  getIsDepositActive,
  getIsWithdrawalActive,
  getCurrencyPool,
  getCurrencyTxMethod,
  getCurrencyLabel,
  getIsSecuritiesPair,
  getCryptoCurrencies,
  getTetherCurrencies,
}
