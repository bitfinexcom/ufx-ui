import _get from 'lodash/get'
import _includes from 'lodash/includes'
import _last from 'lodash/last'
import _map from 'lodash/map'
import _max from 'lodash/max'
import _size from 'lodash/size'
import memoizeOne from 'memoize-one'

import { BOOK_VIZ_TYPES } from './Book.constants'
import { SUCCESS_TEXT, ERROR_TEXT } from '../../common/classes'

const getDecimal = (num) => {
  const asString = `${num}`

  return (_includes(asString, 'e')
    ? parseInt(asString.split('e-')[1], 10)
    : _size(asString.split('.')[1] || ''))
}

/**
 * returns the number of decimal units required
 * to correctly display the smaller number in a list
 * @param {Array} list an array of decimals
 * @returns {Int} number of decimal units
 */
export const getDecimals = (list) => _map(list, row => row.price)
  .map(n => getDecimal(n))
  .reduce((res, d) => Math.max(res, d), 0)

export const calculateBarData = (args = {}) => {
  const {
    value,
    index,
    totals,
    totalMax,
    amountMax,
    zoom,
    bookViz,
    isBid,
  } = args

  const color = isBid ? SUCCESS_TEXT : ERROR_TEXT

  const row = _get(totals, value)
  const { total = 0, amount = 0 } = row || {}

  const zoomRatio = zoom / 100
  const dividend = Math.abs(bookViz === BOOK_VIZ_TYPES.CUMULATIVE ? total : amount)
  const divisor = bookViz === BOOK_VIZ_TYPES.CUMULATIVE ? totalMax : amountMax
  const size = Math.max((dividend / divisor) * zoomRatio, 0)

  return {
    index,
    color,
    size,
  }
}

const getMaxAmount = (data, priceArr) => _max(_map(priceArr, price => Math.abs(_get(data, [price, 'amount']))))

export const getBookAmountMax = memoizeOne((asks, bids, pAsks, pBids) => Math.max(
  getMaxAmount(asks, pAsks),
  getMaxAmount(bids, pBids),
))

export const getBooktMax = memoizeOne((pAsks, pBids, tAsks, tBids) => Math.max(
  Math.abs(_get(tAsks, [_last(pAsks), 'total'], 1)),
  Math.abs(_get(tBids, [_last(pBids), 'total'], 1)),
))
