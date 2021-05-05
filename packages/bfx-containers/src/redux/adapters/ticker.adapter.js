// see https://docs.bitfinex.com/reference#rest-public-tickers

const TRADING_KEYS = [
  'bid',
  'bidSize',
  'ask',
  'askSize',
  'change',
  'changePerc',
  'lastPrice',
  'volume',
  'high',
  'low',
]

const FUNDING_KEYS = [
  'frr',
  'bid',
  'bidPeriod',
  'bidSize',
  'ask',
  'askPeriod',
  'askSize',
  'change',
  'changePerc',
  'lastPrice',
  'volume',
  'high',
  'low',
]

const adapterTrading = (data = [], leadingSymbolElement = false) => {
  const result = {}
  const indexAdjustment = (!leadingSymbolElement) ? 0 : 1
  TRADING_KEYS.forEach((key, index) => {
    result[key] = data[index + indexAdjustment]
  })

  return result
}

const adapterFunding = (data = [], leadingSymbolElement = false) => {
  const result = {}
  const indexAdjustment = (!leadingSymbolElement) ? 0 : 1
  FUNDING_KEYS.forEach((key, index) => {
    result[key] = data[index + indexAdjustment]
  })

  return result
}

export const adapterTradingRest = (data) => adapterTrading(data, true)

export const adapterFundingRest = (data) => adapterFunding(data, true)
