/* eslint-disable import/prefer-default-export */
const TOTAL_SORT = 'total_usd'
const EXCHANGE_KEY = 'exchange'

export const KEYS = {
  NAME: 'name',
  AVAILABLE: 'available',
  TOTAL: 'total',
  TOTAL_SORT,
  EXCHANGE_KEY,
  EXCHANGE: `${EXCHANGE_KEY}.${TOTAL_SORT}`,
}
