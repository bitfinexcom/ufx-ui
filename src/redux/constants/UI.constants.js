import { createTypes } from 'redux-action-types'

export const PAIR_URL_SEPARATOR = ':'
export const PAIR_OUTPUT_SEPARATOR = '/'

export const LAST_PRICE_REQ = 'lastPriceReq'

export const IS_MARKET_TRADES = 'isMarketTrades'

export const BOOK_PREC = 'bookPrec'
export const BOOK_ZOOM = 'bookZoom'

export const DEPTH_CHART_ZOOM = 'depthChartZoom'

const types = createTypes(
  'ufx-core/ui/',
  'UI_LOAD',
  'UI_SET',
)

export default types
