import { createTypes } from 'redux-action-types'

export const AUTH_TRADES_REDUCER_SAGA_KEY = 'authTrades'

const types = createTypes(
  'ufx-core/authTrades/',
  'FETCH_AUTH_TRADES_HISTORY',
  'FETCH_AUTH_TRADES_HISTORY_SUCCESS',
)

export default types
