import { createTypes } from 'redux-action-types'

export const TICKER_REDUCER_SAGA_KEY = 'ticker'

const types = createTypes(
  'ufx-core/tickers/',
  'FETCH_ALL_TICKERS_PERIODICALLY',
  'FETCH_ALL_TICKERS_SUCCESS',
)

export default types
