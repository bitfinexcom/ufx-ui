import { api } from '../functions/api'

export const createCandlesHistoryUrl = (symbolKey) => `/v2/candles/${symbolKey}/hist`

export const getHistoryUrl = (args = {}) => {
  const {
    symbolKey,
    startTime,
    endTime,
    limit,
  } = args

  // check to build the query string
  let params = {}
  if (limit) {
    params = {
      limit,
    }
  }

  if (startTime && endTime) {
    params = {
      ...params,
      end: endTime,
    }
  }

  const queryParams = Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`)
  const url = `/v2/candles/${symbolKey}/hist?${queryParams.join('&')}`

  return url
}

export const getHistoryCandles = (args) => api({
  url: getHistoryUrl(args),
  method: 'get',
})

export default {
  getHistoryCandles,
}
