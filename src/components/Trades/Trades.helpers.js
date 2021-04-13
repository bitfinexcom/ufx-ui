import _groupBy from 'lodash/groupBy'
import _min from 'lodash/min'

import { applyTimeZoneOffset } from '../../utils/time'
import { KEYS } from './Trades.constants'

// Used to style trade table rows based on trade amount and buy/sell
export const getOpacityPercentage = ({ amount = 1, min = 0.001 }) => {
  const base = amount / (min * 1000)
  const percentage = Math.abs(base).toFixed(2)

  return _min([percentage, 1])
}

export const groupByDate = (data = [], key = KEYS.MTS, offset = 0) => {
  const groupedData = _groupBy(data, (o = {}) => {
    const date = applyTimeZoneOffset(new Date(o[key]), offset)
    return date.toDateString()
  })

  const mtsList = Object.keys(groupedData)
  const result = mtsList.reduce((all, mts) => ([
    ...all,
    mts,
    ...groupedData[mts],
  ]), [])

  return result
}
