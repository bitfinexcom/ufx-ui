/* eslint-disable import/prefer-default-export */
import _map from 'lodash/map'
import _omit from 'lodash/omit'
import _slice from 'lodash/slice'
import _sortBy from 'lodash/sortBy'

/**
 * returns the max newest elements of the object
 * based on the "mts" property
 *
 * @param {Object} data source object
 * @param {Number} max number of allowed elements
 * @param {String} field name of the property to sort
 * @return {Object}
 */

export const removeOldest = (data = {}, { max = 20, field = 'mts' }) => {
  const list = Object.values(data)
  const sortedList = _sortBy(list, field)
  const slicedList = _slice(sortedList, 0, max)

  return _omit(data, _map(slicedList, 'id'))
}
