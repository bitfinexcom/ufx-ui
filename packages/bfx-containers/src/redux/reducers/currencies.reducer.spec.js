import currenciesReducer, { INITIAL_STATE } from './currencies.reducer'
import { newState, payload } from './currencies.reducer.data_for_test'
import types from '../constants/currencies.constants'

describe('REDUCER: currencies', () => {
  describe('action: REQUEST_CURRENCIES_INFO_SUCCESS', () => {
    it('empty payload', () => {
      const action = {
        type: types.REQUEST_CURRENCIES_INFO_SUCCESS,
        payload: [],
      }
      expect(currenciesReducer(INITIAL_STATE, action)).toEqual(INITIAL_STATE)
    })
    it('full payload (from real api response)', () => {
      const action = {
        type: types.REQUEST_CURRENCIES_INFO_SUCCESS,
        payload,
      }
      expect(currenciesReducer(INITIAL_STATE, action)).toEqual(newState)
    })
  })
})
