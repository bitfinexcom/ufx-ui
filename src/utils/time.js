/* eslint-disable import/prefer-default-export */

/**
 * applies a TimeZone Offset to an UTC date
 *
 * @param {*} mts date to translate
 * @param {*} offset hours of difference from UTC
 */
export const applyTimeZoneOffset = (date, offset = 0) => {
  const localOffset = date.getTimezoneOffset()
  const delta = (localOffset + offset) * 60000

  return new Date(date.getTime() + delta)
}
