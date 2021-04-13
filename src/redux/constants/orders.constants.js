import { createTypes } from 'redux-action-types'

export const ORDERS_REDUCER_SAGA_KEY = 'orders'
export const ORDERS_NOTIF_REDUCER_SAGA_KEY = 'orders-notif'

const types = createTypes(
  'ufx-core/notifications/',
  'FETCH_ORDER_HISTORY',
  'FETCH_ORDER_HISTORY_SUCCESS',
  'SUBMIT_ORDER',
  'CANCEL_ORDER',
)

export default types
