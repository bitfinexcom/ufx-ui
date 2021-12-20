import _includes from 'lodash/includes'
import _isFinite from 'lodash/isFinite'
import _isNull from 'lodash/isNull'
import _size from 'lodash/size'

export function getDecimal(num) {
  const asString = `${num}`

  return (_includes(asString, 'e')
    ? parseInt(asString.split('e-')[1], 10)
    : _size(asString.split('.')[1] || ''))
}

const NUMBER_FORMAT_MAP = {}
const INTL_FRACTION_DIGITS_MAX_VAL = 20

export const formatNumber = (args = {}) => {
  const {
    number, decimals: realDecimals, significantFigures, useGrouping = false,
    short = false,
  } = args

  // use decimals for numbers less than 1
  const decimals = (short && number !== 0 && Math.abs(number) < 1 && _isFinite(significantFigures))
    ? significantFigures
    : realDecimals

  const options = { useGrouping }
  if (_isFinite(decimals) && decimals >= 0) {
    options.minimumFractionDigits = Math.min(decimals, INTL_FRACTION_DIGITS_MAX_VAL)
    options.maximumFractionDigits = Math.min(decimals, INTL_FRACTION_DIGITS_MAX_VAL)
  } else if (_isFinite(significantFigures)) {
    const sigFig = number === 0
      ? 3
      : significantFigures
    options.minimumSignificantDigits = sigFig
    options.maximumSignificantDigits = sigFig
  }
  if (short) {
    options.notation = 'compact'
    options.compactDisplay = 'short'
  }

  const key = `${options.useGrouping}-${options.minimumFractionDigits}-`
    + `${options.maximumFractionDigits}-${options.minimumSignificantDigits}-`
    + `${options.maximumSignificantDigits}-${short}`
  let numberFormatter = NUMBER_FORMAT_MAP[key]
  if (!numberFormatter) {
    numberFormatter = new Intl.NumberFormat('EN-US', options)
    NUMBER_FORMAT_MAP[key] = numberFormatter
  }
  const res = numberFormatter.format(number)
  const isSmallValue = number && Math.abs(number) < 1 && options.maximumSignificantDigits
  if (isSmallValue && res.replace('-', '').length - 2 > options.maximumSignificantDigits) {
    // replace trailing zeors for values if they are longer than sigfig
    // for sigfig 4 0.0003000 -> 0.0003
    // for sigfig 4 0.3000 -> 0.3000
    return res.replace(/0+$/, '')
  }
  return res
}

export const getNumberOfDecimalsByPrice = (price, significantDigits = 5) => Math.max(0, significantDigits - 1 - Math.floor(Math.log10(price)))

export function getDecimals(price, min = 5, max = 8) {
  let zerosCount = 0
  let x = Math.round(price * 10 ** max)
  if (x === 0) return max

  while (x % 10 === 0) {
    x = Math.round(x / 10)
    zerosCount += 1
  }

  const decimals = max - zerosCount

  return Math.max(min, decimals)
}

export function getNumberOfDecimalsByPriceLowerThan1(price) {
  return getDecimals(price)
}

export function getNumberOfDecimals(price) {
  if (!price) {
    return 0
  }
  const absPrice = Math.abs(price)

  return absPrice < 1
    ? getNumberOfDecimalsByPriceLowerThan1(absPrice)
    : getNumberOfDecimalsByPrice(absPrice)
}

export const formatPrice = (price, opts = {}) => formatNumber({
  number: price,
  significantFigures: 5,
  decimals: opts.minDecimals
    ? Math.max(opts.minDecimals, getNumberOfDecimals(price))
    : getNumberOfDecimals(price),
  useGrouping: true,
  ...opts,
})

export const formatVolume = volume => formatNumber({
  number: volume,
  decimals: 0,
  useGrouping: true,
})

export const formatVolumePercentChange = (volumeChange, decimals = 1) => {
  const valueString = formatNumber({
    number: Math.abs(volumeChange * 100),
    decimals,
  })
  const sign = (volumeChange < 0) ? '-' : ''
  return `${sign}${valueString}%`
}

export const formatTotal = total => formatNumber({
  number: total,
  decimals: 4,
  useGrouping: true,
})

export const checkDecimals = (maxDecimals, createError, t, fieldLabel) => (number) => {
  if (_isFinite(number)) {
    let exponent = 1
    let decimals = 0

    const allowedDecimals = _isNull(maxDecimals)
      ? getNumberOfDecimalsByPrice(number)
      : maxDecimals

    // @TODO this is not very readable
    while (Math.round(number * exponent) / exponent !== number) {
      exponent *= 10
      // eslint-disable-next-line no-plusplus
      if (++decimals > allowedDecimals) {
        if (allowedDecimals === 0) {
          return createError({
            message: t('error:no_decimals', { fieldLabel }),
          })
        }

        return createError({
          message: t('error:max_decimals', { fieldLabel, allowedDecimals }),
        })
      }
    }
  }

  return true
}

/* eslint-disable import/prefer-default-export */
export const numberToFiatString = (value) => {
  const opts = value < 10000
    ? { maximumFractionDigits: 2, minimumFractionDigits: 2 }
    : { maximumFractionDigits: 0, minimumFractionDigits: 0 }
  return value.toLocaleString('EN-US', opts)
}

export const getDigits = (value) => {
  const number = Number(value)
  const string = number.toString()
  const hasExponent = string.indexOf('e') !== -1 // is the number written using the scientific notation

  if (hasExponent) {
    const exponent = string.split('e')[1].substring(1)
    return parseInt(exponent, 10) + 1
  }

  return number.toString().length
}
