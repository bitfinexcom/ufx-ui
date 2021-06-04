/* eslint-disable import/prefer-default-export */
import Big from 'bignumber.js'
import _isFinite from 'lodash/isFinite'
import _isNaN from 'lodash/isNaN'

/**
 * Smartly set the precision (decimal) on a value based off of the significant
 * digit maximum. For example, calling with 3.34 when the max sig figs allowed
 * is 5 would return '3.3400', the representation number of decimals IF they
 * weren't zeros.
 *
 * @param {number} n
 * @param {number} maxSigs - default 5
 * @return {string} str
 */
const SIG_FIGS = 5

export const setSigFig = (number = 0, maxSigs = SIG_FIGS) => {
  const n = +(number)
  if (!_isFinite(n)) {
    return number
  }
  const value = n.toPrecision(maxSigs)

  return value.match(/e/)
    ? new Big(value).toString(10)
    : value
}

/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  number The value.
 * @param {Integer} e   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
export const decimalAdjust = (type, num, e) => {
  // If the exp is undefined or zero...
  let value = +num
  const exp = +e
  if (typeof e === 'undefined' || exp === 0) {
    return Math[type](num)
  }

  // If the value is not a number or the exp is not an integer...
  if (_isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN
  }

  // Shift
  value = value.toString().split('e')
  value = Math[type](+(`${value[0]}e${value[1] ? (+value[1] - exp) : -exp}`))

  // Shift back
  value = value.toString().split('e')

  return +(`${value[0]}e${value[1] ? (+value[1] + exp) : exp}`)
}

/**
 * Rounds down to specified number of decimals, and adds the minimum number of
 * zeros to ensure that a set of numbers passed through this function will
 * all have the same number of decimals.
 *
 * @param {number} num
 * @param {number} prec
 * @return {string} str
 */
export const precision = (num, prec = 0) => {
  if (_isNaN(num) || _isNaN(prec)) {
    return ''
  }

  const type = num > 0
    ? 'floor'
    : 'ceil'
  let result = decimalAdjust(type, num, -prec)

  result = String(result.toFixed(prec))

  // Fix if we have 'e notation'
  if (result.match(/e(-\d+)/)) {
    const base = result.match(/(\d+.?\d*)e/)[1]
    const exp = result.match(/e(-\d+)/)[1]
    const numZeros = Math.abs(exp)

    result = Array(numZeros).join('0') + base.replace(/\./, '')
    result = result.slice(0, prec)

    return `0.${result}`
  }

  if (!(result.match(/\./)) && prec <= 0) {
    return result
  }

  if (!(result.match(/\./))) {
    return `${result}.${Array(prec + 1).join('0')}`
  }

  if (result.split('.')[1].length < prec) {
    const zerosToAdd = prec - result.split('.')[1].length
    return `${result}${Array(zerosToAdd + 1).join('0')}`
  }

  return result
}
