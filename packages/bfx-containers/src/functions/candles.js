import { startOfWeekUTC, startOfMonthUTC } from '@ufx-ui/utils'
import { add, sub } from 'date-fns'

/*
import {
  convertResolutionToSymbolKey,
} from '../var/chart'
*/

export const INTERVAL = {
  MINUTE: '1',
  MINUTES_5: '5',
  MINUTES_15: '15',
  MINUTES_30: '30',
  HOUR: '60',
  HOURS_3: '180',
  HOURS_4: '240',
  HOURS_6: '360',
  HOURS_12: '720',
  DAY: '1D',
  WEEK: '1W',
  MONTH: '1M',
}

export const RESOLUTION_MAP = {
  [INTERVAL.MINUTE]: '1m',
  [INTERVAL.MINUTES_5]: '5m',
  [INTERVAL.MINUTES_15]: '15m',
  [INTERVAL.MINUTES_30]: '30m',
  [INTERVAL.HOUR]: '1h',
  [INTERVAL.HOURS_3]: '3h',
  [INTERVAL.HOURS_4]: '4h',
  [INTERVAL.HOURS_6]: '6h',
  [INTERVAL.HOURS_12]: '12h',
  [INTERVAL.DAY]: '1D',
  [INTERVAL.WEEK]: '1W',
  [INTERVAL.MONTH]: '1M',
}

const MS_IN_MINUTE = 1000 * 60
const MS_IN_HOUR = MS_IN_MINUTE * 60
const MS_IN_DAY = MS_IN_HOUR * 24
const MS_IN_INTERVAL = {
  [INTERVAL.MINUTE]: MS_IN_MINUTE,
  [INTERVAL.MINUTES_5]: MS_IN_MINUTE * 5,
  [INTERVAL.MINUTES_15]: MS_IN_MINUTE * 15,
  [INTERVAL.MINUTES_30]: MS_IN_MINUTE * 30,
  [INTERVAL.HOUR]: MS_IN_HOUR,
  [INTERVAL.HOURS_3]: MS_IN_HOUR * 3,
  [INTERVAL.HOURS_4]: MS_IN_HOUR * 4,
  [INTERVAL.HOURS_6]: MS_IN_HOUR * 6,
  [INTERVAL.HOURS_12]: MS_IN_HOUR * 12,
  [INTERVAL.DAY]: MS_IN_DAY,
  [INTERVAL.WEEK]: MS_IN_DAY * 7,
  [INTERVAL.MONTH]: MS_IN_DAY * 30,
}

export const formatResolution = (resolution) => {
  const replaceMap = {
    D: INTERVAL.DAY,
    W: INTERVAL.WEEK,
    M: INTERVAL.MONTH,
  }

  return (replaceMap[resolution])
    ? replaceMap[resolution]
    : resolution
}

/*
// Translates the resolution that tradingview knows about to the resolution that bitfinex side needs
export function generateSymbolKey(pair, resolution, addPrefix) {
  const converted = convertResolutionToSymbolKey(resolution)
  if (typeof converted === 'undefined') {
    // give a warning if we try to use an unsupported resolution/pair
    // eslint-disable-next-line no-console
    console.warn(`Unable to generate symbolKey for resolution: ${resolution}, pair: ${pair}`)
  }
  return `trade:${converted}:${addPrefix(pair)}`
}
*/

export const getMsInInterval = (resolution) => {
  const formatted = formatResolution(resolution)
  return MS_IN_INTERVAL[formatted]
}

// converts a mts to its candle start time
export function getCandleTime(mts, interval) {
  if (interval === INTERVAL.WEEK) {
    return startOfWeekUTC(mts).getTime()
  }
  if (interval === INTERVAL.MONTH) {
    return startOfMonthUTC(mts).getTime()
  }

  const intervalMilliseconds = getMsInInterval(interval)
  return Math.floor(mts / intervalMilliseconds) * intervalMilliseconds
}

export function pickCandleTime(time, interval, count = 0, isNext = false) {
  if (!time || !interval) {
    throw new Error('Invalid time or interval for candle time')
  }
  if (interval === INTERVAL.MONTH) {
    let nextMonth = new Date(time)
    // we need to add the date offset, so we are in the same day as the UTC date (even if the unix timestamp is different)
    // to add/remove months we only care about the current date value disregarding the offset, ex: ( 2019-11-30 GMT-4 => 2019-12-01 IN UTC), if we don't do this, the month with be mismatched in some cases
    nextMonth = add(nextMonth, { minutes: nextMonth.getTimezoneOffset() })

    if (count > 0) {
      if (isNext) {
        nextMonth = add(nextMonth, { months: count })
      } else {
        nextMonth = sub(nextMonth, { months: count })
      }
    }
    return startOfMonthUTC(nextMonth).getTime()
  }

  const delta = (isNext)
    ? count
    : count * -1

  return time + (getMsInInterval(interval) * delta)
}
