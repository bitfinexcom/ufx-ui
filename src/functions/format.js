// format.js
import _includes from 'lodash/includes'
import _memoize from 'lodash/memoize'
import _padStart from 'lodash/padStart'
import _replace from 'lodash/replace'
import _size from 'lodash/size'
import _split from 'lodash/split'
import _startsWith from 'lodash/startsWith'
import _toLower from 'lodash/toLower'
import _toUpper from 'lodash/toUpper'

import { PAIR_URL_SEPARATOR, PAIR_OUTPUT_SEPARATOR } from '../redux/constants/UI.constants'

const DERIVATIVE_SPOT_REGEX = /F[A-Z]{0,1}[0-9]{1,9}/i
const PERPETUAL_SWAPS_REGEX = /[A-Z]{2,}F[A-Z]{0,1}[0-9]{1,3}/
const FUTURES_REGEX = /[A-Z]{2,}F([A-Z]{1})([0-9]{1,9})/

export const TRADING_PREFIX = 't'
export const FUNDING_PREFIX = 'f'

// obtains a pair from a given symbol without the prefix
// ex. tBTCUSD -> BTCUSD
// ex. fUSD -> USD
// it just removes the first letter if it's a "t" or "f"
export const removePrefix = (symbol = '') => {
  if (!symbol) {
    return ''
  }
  const s = symbol.toString().charAt(0)
  return (s === TRADING_PREFIX || s === FUNDING_PREFIX)
    ? _toUpper(symbol.substring(1))
    : _toUpper(symbol)
}

// returns true if symbol is a valid trading or derivative pair
export const isPair = (symbol) => {
  const s = _size(removePrefix(symbol))
  if (s === 6) {
    return true
  }
  if (s > 6) {
    return _includes(symbol, PAIR_OUTPUT_SEPARATOR) || _includes(symbol, PAIR_URL_SEPARATOR)
  }
  return false
}

export const isPerpetualSwapCcy = (ccy = '') => PERPETUAL_SWAPS_REGEX.test(ccy)

export const isFutureCcy = (ccy = '') => FUTURES_REGEX.test(ccy)

// last two chars must be "F" followed by a number
export const isDerivativeCcy = (ccy = '') => isPerpetualSwapCcy(ccy) || isFutureCcy(ccy)

// converts derivative ccy to usual, if optional `replace` is not false
// USDF0 -> USD
export const derivativeToCcy = (ccy = '', replace = true) => (
  (replace)
    ? _replace(ccy, DERIVATIVE_SPOT_REGEX, '')
    : ccy
)

export const buildPair = (from, to) => {
  const isDerivPair = isDerivativeCcy(from) && isDerivativeCcy(to)
  const first = !isDerivPair && isDerivativeCcy(from)
    ? derivativeToCcy(from)
    : from
  const second = !isDerivPair && isDerivativeCcy(to)
    ? derivativeToCcy(to)
    : to
  const separator = _size(first) > 3 || _size(second) > 3
    ? PAIR_URL_SEPARATOR
    : ''

  return `t${first}${separator}${second}`
}

// returns the symbols present in a pair
// it supports the following formats:
// - <any>/<any>
// - t<any>/<any>
// - f<any>
// - YYY/ZZZ
// - tYYY/ZZZ
// - fYYY

export const getSymbols = _memoize((pair = '') => {
  if (_startsWith(pair, FUNDING_PREFIX)) {
    return [pair.substring(1), '']
  }

  const input = _startsWith(pair, TRADING_PREFIX)
    ? pair.substring(1)
    : pair

  if (input.length > 6) {
    return _split(input, /\/|:/, 2)
  }
  return [input.slice(0, 3), input.slice(3, 6)]
})

// first symbol of a pair
// it supports pairs of API v2
// ex. tBTCUSD
export const firstInPair = (pair, uppercase) => {
  const [first = '-'] = getSymbols(pair)

  return uppercase
    ? _toUpper(first)
    : _toLower(first)
}

// last symbol of a pair
// it supports new pairs of API v2
// ex. tBTCUSD
export const lastInPair = (pair, uppercase) => {
  const [, second = '-'] = getSymbols(pair)

  return uppercase
    ? _toUpper(second)
    : _toLower(second)
}

export const startsWithAPrefix = (str) => _startsWith(str, TRADING_PREFIX) || _startsWith(str, FUNDING_PREFIX)

export const getPairParts = (pair) => [firstInPair(pair, true), lastInPair(pair, true)]

export const startsWithFundingPrefix = (symbol) => _startsWith(symbol, FUNDING_PREFIX)

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

/**
 * Pads the number in two positions
 *
 * @param value {Number}
 * @returns {String}
 *
 * ex. 1 -> 01
 * ex. 99 -> 99
 */
export const pad2 = (value) => _padStart(value, 2, '0')
