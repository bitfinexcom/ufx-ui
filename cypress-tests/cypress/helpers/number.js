import _join from 'lodash/join'
import _size from 'lodash/size'
import _toString from 'lodash/toString'

// converts string to number (123,45.67 -> 12345.67)
export const numberFromLocaleString = (stringValue, locale) => {
  const parts = Number(1111.11)
    .toLocaleString(locale)
    .replace(/\d+/g, '')
    .split('')

  if (stringValue === null) {
    return null
  }

  if (parts.length === 1) {
    parts.unshift('')
  }

  return Number(
    String(stringValue)
      .replace(new RegExp(parts[0].replace(/\s/g, ' '), 'g'), '')
      .replace(parts[1], '.'),
  )
}

export const getNumberOfTrailingZeros = (number) => _size(_join(_toString(number).match(/(0+)$/g)))
