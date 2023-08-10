import authTradesReducer, { INITIAL_STATE } from './authTrades.reducer'
import types from '../constants/authTrades.constants'
import wsTypes from '../constants/ws.constants'

describe('REDUCER: authTrades', () => {
  describe('action: FETCH_AUTH_TRADES_HISTORY_SUCCESS', () => {
    it('full payload', () => {
      const action = {
        type: types.FETCH_AUTH_TRADES_HISTORY_SUCCESS,
        payload: [
          [
            399251013,
            'tETHUSD',
            1573485493000,
            33963608932,
            0.26334268,
            187.37,
            'LIMIT',
            null,
            -1,
            -0.09868591,
            'USD',
          ],
        ],
        meta: { symbol: 'tBTCUSD' },
      }
      expect(authTradesReducer(INITIAL_STATE, action)).toEqual({
        ...INITIAL_STATE,
        tBTCUSD: {
          399251013: {
            id: 399251013,
            pair: 'tETHUSD',
            mts: 1573485493000,
            order_id: 33963608932,
            amount: 0.26334268,
            price: 187.37,
            order_type: 'LIMIT',
            order_price: null,
            maker: -1,
            fee: -0.09868591,
            fee_currency: 'USD',
          },
        },
      })
    })
  })
  describe('action: TE_MESSAGE', () => {
    const initialState = {
      ...INITIAL_STATE,
      tBTCUSD: {
        399251013: {
          id: 399251013,
          pair: 'tETHUSD',
          mts: 1573485493000,
          order_id: 33963608932,
          amount: 0.26334268,
          price: 187.37,
          order_type: 'LIMIT',
          order_price: null,
          maker: -1,
          fee: -0.09868591,
          fee_currency: 'USD',
        },
      },
    }
    it('null payload', () => {
      const action = {
        type: wsTypes.TE_MESSAGE,
        payload: null,
      }
      expect(authTradesReducer(initialState, action)).toEqual(initialState)
    })
    it('channelId is not 0', () => {
      const action = {
        type: wsTypes.TE_MESSAGE,
        payload: [
          5,
          'te',
          [
            399251013,
            'tETHUSD',
            1573485493000,
            33963608932,
            0.26334268,
            187.37,
            'LIMIT',
            null,
            -1,
            -0.09868591,
            'USD',
          ],
        ],
      }
      expect(authTradesReducer(initialState, action)).toEqual(initialState)
    })
    it('full payload', () => {
      const action = {
        type: wsTypes.TE_MESSAGE,
        payload: [
          0,
          'te',
          [
            399251013,
            'tETHUSD',
            1573485493000,
            33963608932,
            0.26334268,
            187.37,
            'LIMIT',
            null,
            -1,
            -0.09868591,
            'USD',
          ],
        ],
      }
      expect(authTradesReducer(initialState, action)).toEqual({
        ...initialState,
        tETHUSD: {
          399251013: {
            id: 399251013,
            pair: 'tETHUSD',
            mts: 1573485493000,
            order_id: 33963608932,
            amount: 0.26334268,
            price: 187.37,
            order_type: 'LIMIT',
            order_price: null,
            maker: -1,
            fee: -0.09868591,
            fee_currency: 'USD',
          },
        },
      })
    })
  })
})
