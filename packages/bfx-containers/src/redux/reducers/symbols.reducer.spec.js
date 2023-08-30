import symbolsReducer, { INITIAL_STATE } from './symbols.reducer'
import types from '../constants/currencies.constants'

describe('REDUCER: symbols', () => {
  describe('action: REQUEST_SYMBOL_DETAILS_SUCCESS', () => {
    it('full payload', () => {
      const action = {
        type: types.REQUEST_SYMBOL_DETAILS_SUCCESS,
        payload: [{
          pair: 'btcusd',
          price_precision: 5,
          initial_margin: '30.0',
          minimum_margin: '15.0',
          maximum_order_size: '2000.0',
          minimum_order_size: '0.01',
          expiration: 'NA',
          margin: '20.0',
        }, {
          pair: 'ltcusd',
          price_precision: 5,
          initial_margin: '30.0',
          minimum_margin: '15.0',
          maximum_order_size: '5000.0',
          minimum_order_size: '0.1',
          expiration: 'NA',
          margin: '20.0',
        }],
      }
      expect(symbolsReducer(INITIAL_STATE, action)).toEqual({
        ...INITIAL_STATE,
        tBTCUSD: {
          pricePrecision: 5,
          initialMargin: '30.0',
          minMargin: '15.0',
          maxSize: '2000.0',
          minSize: '0.01',
          expiration: 'NA',
          margin: '20.0',
        },
        tLTCUSD: {
          pricePrecision: 5,
          initialMargin: '30.0',
          minMargin: '15.0',
          maxSize: '5000.0',
          minSize: '0.1',
          expiration: 'NA',
          margin: '20.0',
        },
      })
    })
    it('empty payload', () => {
      const action = {
        type: types.REQUEST_SYMBOL_DETAILS_SUCCESS,
        payload: null,
      }
      expect(symbolsReducer(INITIAL_STATE, action)).toEqual(INITIAL_STATE)
    })
  })
})
