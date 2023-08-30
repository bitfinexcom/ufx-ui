import tickerReducer, { INITIAL_STATE } from './ticker.reducer'
import types from '../constants/ticker.constants'

describe('REDUCER: ticker', () => {
  describe('action: FETCH_ALL_TICKERS_SUCCESS', () => {
    it('funding and trading pairs', () => {
      const action = {
        type: types.FETCH_ALL_TICKERS_SUCCESS,
        payload: [
          [
            'tBTCUSD',
            67664,
            8.89283155,
            67665,
            7.74958708,
            1789,
            0.0272,
            67667,
            7245.61860488,
            68444,
            65257,
          ],
          [
            'fDOGE',
            0.00016927123287671233,
            0.000018,
            2,
            5880923.00099328,
            0.00009566,
            2,
            401803.4636769599,
            -0.00017674,
            -0.5902,
            0.0001227,
            12382627.84040473,
            0.000742,
            0.0000108,
            null,
            null,
            2564.75575516,
          ],
        ],
      }
      expect(tickerReducer(INITIAL_STATE, action)).toEqual({
        ...INITIAL_STATE,
        tBTCUSD: {
          bid: 67664,
          bidSize: 8.89283155,
          ask: 67665,
          askSize: 7.74958708,
          change: 1789,
          changePerc: 0.0272,
          lastPrice: 67667,
          volume: 7245.61860488,
          high: 68444,
          low: 65257,
        },
        fDOGE: {
          frr: 0.00016927123287671233,
          bid: 0.000018,
          bidPeriod: 2,
          bidSize: 5880923.00099328,
          ask: 0.00009566,
          askPeriod: 2,
          askSize: 401803.4636769599,
          change: -0.00017674,
          changePerc: -0.5902,
          lastPrice: 0.0001227,
          volume: 12382627.84040473,
          high: 0.000742,
          low: 0.0000108,
        },
      })
    })
    it('empty payload', () => {
      const action = {
        type: types.FETCH_ALL_TICKERS_SUCCESS,
        payload: [],
      }
      expect(tickerReducer(INITIAL_STATE, action)).toEqual(INITIAL_STATE)
    })
  })
})
