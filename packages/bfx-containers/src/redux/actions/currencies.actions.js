import types from '../constants/currencies.constants'

export const requestCurrenciesInfo = () => ({
  type: types.REQUEST_CURRENCIES_INFO,
})

export const requestCurrenciesInfoSuccess = (payload) => ({
  type: types.REQUEST_CURRENCIES_INFO_SUCCESS,
  payload,
})

export const requestSymbolDetails = (payload) => ({
  type: types.REQUEST_SYMBOL_DETAILS,
  payload,
})

export const requestSymbolDetailsSuccess = (payload) => ({
  type: types.REQUEST_SYMBOL_DETAILS_SUCCESS,
  payload,
})

export const requestConversions = (payload) => ({
  type: types.REQUEST_CONVERSIONS,
  payload,
})

export const requestConversionsSuccess = (payload) => ({
  type: types.REQUEST_CONVERSIONS_SUCCESS,
  payload,
})

export default {
  requestCurrenciesInfo,
  requestCurrenciesInfoSuccess,
  requestSymbolDetails,
  requestSymbolDetailsSuccess,
  requestConversions,
  requestConversionsSuccess,
}
