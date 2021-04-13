/* eslint-disable import/prefer-default-export */
import types from '../constants/authTrades.constants'

export const fetchAuthTradesHistory = (payload) => ({ type: types.FETCH_AUTH_TRADES_HISTORY, payload })
