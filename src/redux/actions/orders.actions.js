import types from '../constants/orders.constants'

export const fetchOrderHistory = (payload) => ({
  type: types.FETCH_ORDER_HISTORY,
  payload,
})

export const setOrderHistory = (payload) => ({
  type: types.FETCH_ORDER_HISTORY_SUCCESS,
  payload,
})

export const submitOrder = (order) => ({
  type: types.SUBMIT_ORDER,
  payload: order,
})

export const cancelOrder = (orderId) => ({
  type: types.CANCEL_ORDER,
  payload: { orderId },
})
