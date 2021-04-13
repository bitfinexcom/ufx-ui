/* eslint-disable import/prefer-default-export */
import { ORDER_TYPES } from '../format/OrderType'

export const DEFAULT_ACTION_TIMEOUT = 500

export const INITIAL_STATE = {
  orderType: ORDER_TYPES.EXCHANGE_LIMIT,
  price: '',
  amount: '',
  postOnly: false,
  isBuy: true,
  tif: false,
  tifDate: null,
  errors: {
    amount: '',
    price: '',
    tifDate: '',
  },
}
