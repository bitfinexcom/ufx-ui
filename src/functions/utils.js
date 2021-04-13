import {
  addDays,
  isValid,
  isBefore,
  isAfter,
} from 'date-fns'
import _find from 'lodash/find'
import _get from 'lodash/get'
import _groupBy from 'lodash/groupBy'
import _isEqual from 'lodash/isEqual'
import _isObject from 'lodash/isObject'
import _map from 'lodash/map'
import _transform from 'lodash/transform'

export const snapshot = (rawData = [], adapter = () => {}, opts = {}) => {
  const data = _map(rawData, (row) => adapter(row, opts))
  const dataObj = {}
  data.forEach((row) => {
    const { id } = row
    dataObj[id] = row
  })

  return dataObj
}

/**
 * returns a series of prices grouped by the current psnap levels
 * useful for assigning alerts/orders to psnap price levels in books
 *
 * @param {Object} args
 * @param {Array<Number>} args.psnap psnap book price levels
 * @param {Array<Number|Object>} args.list prices to show in the list
 * @param {String|Bool} args.prop name of the property to check in case it's not an array of numbers
 * @param {Bool} args.isBid reverses the order of the sorting, if true
 * @returns {Object} key: psnap price level, value: array of prices at that level
 *
 * ex.
 * const psnap = [ 1, 2, 3, 4, 5, 10 ]
 * const prices = [ 1.1, 1.2, 1.3, 4, 1000 ]
 * groupPrices({ psnap, prices })
 * returns {
 *   "2": [ 1.1, 1.2, 1.3 ],
 *   "4": [ 4 ],
 *   "10": [ 1000 ]
 * }
 */
export const groupPrices = (args = {}) => {
  const {
    psnap = [],
    list = [],
    prop = false,
    isBid = false,
  } = args

  const search = (el) => _find(
    psnap,
    (curr, index) => {
      const price = (prop)
        ? _get(el, [prop])
        : el
      const extremum = (isBid)
        ? Number.POSITIVE_INFINITY
        : Number.NEGATIVE_INFINITY

      const prev = psnap[index - 1] || extremum

      return (isBid)
        ? (+curr <= +price && +price < +prev)
        : (+curr >= +price && +price > +prev)
    },
  )

  return _groupBy(list, search)
}

export const difference = (object, base) => {
  const changes = (o, b) => _transform(o, (result, value, key) => {
    if (!_isEqual(value, b[key])) {
      // eslint-disable-next-line no-param-reassign
      result[key] = (_isObject(value) && _isObject(b[key])) ? changes(value, b[key]) : value
    }
  })
  return changes(object, base)
}

export const isValidDate = (date) => isValid(new Date(date))

const isBeforeMinDate = (date, minDays) => isBefore(new Date(date), addDays(new Date(), minDays))
const isAfterMaxDate = (date, maxDays) => isAfter(new Date(date), addDays(new Date(), maxDays))

export const isValidTifDate = (createError, t, minDays, maxDays) => (date) => {
  if (isBeforeMinDate(date, minDays)) {
    return createError({
      message: t('error:must_be_after_min_date'),
    })
  }
  if (isAfterMaxDate(date, maxDays)) {
    return createError({
      message: t('error:must_be_before_max_date'),
    })
  }
  return true
}
