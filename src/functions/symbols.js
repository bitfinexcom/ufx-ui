import _endsWith from 'lodash/endsWith'
import _includes from 'lodash/includes'
import _isString from 'lodash/isString'
import _toLower from 'lodash/toLower'

import { PAIR_URL_SEPARATOR } from '../redux/constants/UI.constants'
import { firstInPair, lastInPair } from './format'

export const DECIMALS_CRYPTO = 8
export const DECIMALS_FIAT = 2

export const fiatCcys = [
  'USD',
  'EUR',
  'JPY',
  'HKD',
  'GBP',
  'CHF',
]

export const isFiat = (symbol) => _includes(fiatCcys, symbol)

export const isTether = (symbol) => _endsWith(_toLower(symbol), 't')

export const urlPair = (pair) => {
  if (!_isString(pair)) {
    return ''
  }
  return `${firstInPair(pair, true)}${PAIR_URL_SEPARATOR}${lastInPair(pair, true)}`
}

export const convertToUrlPair = (baseCcy, quoteCcy) => `${baseCcy}${PAIR_URL_SEPARATOR}${quoteCcy}`

export const getDecimalsForSymbol = (symbol) => {
  if (isTether(symbol) && _toLower(symbol) !== 'xaut') {
    return DECIMALS_FIAT
  }
  return (isFiat(symbol))
    ? DECIMALS_FIAT
    : DECIMALS_CRYPTO
}
