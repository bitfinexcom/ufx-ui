/* eslint-disable import/prefer-default-export */
import _filter from 'lodash/filter'
import _get from 'lodash/get'

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

  if (customFormat) {
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

export const getVisibleColumns = (columns, customMapping = {}) => _filter(columns, ({ key }) => !_get(customMapping, [key, 'hidden'], false))
