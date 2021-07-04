import _filter from 'lodash/filter'
import _get from 'lodash/get'
import _isFunction from 'lodash/isFunction'
import _map from 'lodash/map'
import _sortBy from 'lodash/sortBy'
import _values from 'lodash/values'

export const getValue = ({
  mapping = {},
  customMapping = {},
  data,
}) => (key, shouldFormat = true) => {
  const defaultValue = _get(mapping, [key, 'defaultValue'])
  const defaultFormat = _get(mapping, `${key}.format`)
  const customFormat = _get(customMapping, `${key}.format`)
  const selector = _get(customMapping, `${key}.selector`, key)
  const value = _get(data, selector, defaultValue)

  if (!shouldFormat || (!customFormat && !defaultFormat)) {
    return value
  }

  if (_isFunction(customFormat)) {
    return customFormat(value, selector, data)
  }

  return defaultFormat(value)
}

export const getMappedKey = (key, customMapping = {}) => {
  const customKey = _get(customMapping, [key, 'selector'])
  return customKey || key
}

export const getMappingForKey = (customMapping = {}) => (key) => {
  const customKey = _get(customMapping, [key, 'selector'])
  return customKey || key
}

export const getVisibleColumns = (columns, customMapping = {}) => _filter(columns, ({ dataKey }) => !_get(customMapping, [dataKey, 'hidden'], false))

export const getOrderedColumns = (columns, customMapping = {}) => {
  const hasOrdering = _values(customMapping).some(row => !Number.isNaN(row.index))

  if (!hasOrdering) {
    return columns
  }

  const indexedColumns = _map(columns, column => ({ ...column, index: _get(customMapping, [column.dataKey, 'index'], null) }))
  const sortedColumns = _sortBy(indexedColumns, ['index', 'asc'])

  return sortedColumns
}

export const getMappedColumns = (columns, customMapping = {}) => {
  const visibleColumns = getVisibleColumns(columns, customMapping)
  const orderedColumns = getOrderedColumns(visibleColumns, customMapping)

  return orderedColumns
}
