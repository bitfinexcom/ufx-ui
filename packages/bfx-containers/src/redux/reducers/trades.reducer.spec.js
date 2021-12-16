import types from '../constants/ws.constants'
import tradesReducer, { INITIAL_STATE } from './trades.reducer'

describe('REDUCER: trades', () => {
  const initialState = {
    ...INITIAL_STATE,
    215: {
      882658652: {
        id: 882658652,
        mts: 1636473340602,
        amount: -0.000066,
        price: 66761.43094054,
      },
      882658654: {
        id: 882658654,
        mts: 1636473340603,
        amount: -0.07558234,
        price: 66761,
      },
    },
  }
  describe('action: TRADES_SNAPSHOT_MESSAGE', () => {
    it('full payload', () => {
      const action = {
        type: types.TRADES_SNAPSHOT_MESSAGE,
        channel: {
          event: 'subscribed',
          channel: 'trades',
          chanId: 12,
          symbol: 'tBTCUSD',
          pair: 'BTCUSD',
        },
        payload: [
          12,
          [
            [882658654, 1636473340603, -0.07558234, 66761],
            [882658652, 1636473340602, -0.000066, 66761.43094054],
            [882658650, 1636473340600, -0.000066, 66761.61528441],
          ],
        ],
      }
      expect(tradesReducer(initialState, action)).toEqual({
        ...initialState,
        12: {
          882658650: {
            id: 882658650,
            mts: 1636473340600,
            amount: -0.000066,
            price: 66761.61528441,
          },
          882658652: {
            id: 882658652,
            mts: 1636473340602,
            amount: -0.000066,
            price: 66761.43094054,
          },
          882658654: {
            id: 882658654,
            mts: 1636473340603,
            amount: -0.07558234,
            price: 66761,
          },
        },
      })
    })
    it('empty payload', () => {
      const action = {
        type: types.TRADES_SNAPSHOT_MESSAGE,
        channel: {
          event: 'subscribed',
          channel: 'trades',
          chanId: 12,
          symbol: 'tBTCUSD',
          pair: 'BTCUSD',
        },
        payload: null,
      }
      expect(tradesReducer(initialState, action)).toEqual(initialState)
    })
    it('channel id 0', () => {
      const action = {
        type: types.TRADES_SNAPSHOT_MESSAGE,
        channel: { chanId: 0 },
        payload: null,
      }
      expect(tradesReducer(initialState, action)).toEqual(initialState)
    })
    it('empty row data', () => {
      const action = {
        type: types.TRADES_SNAPSHOT_MESSAGE,
        channel: {
          event: 'subscribed',
          channel: 'trades',
          chanId: 45,
          symbol: 'tBTCUSD',
          pair: 'BTCUSD',
        },
        payload: [45, [], []],
      }
      expect(tradesReducer(initialState, action)).toEqual({
        ...initialState,
        45: {},
      })
    })
  })

  describe('action: TE_MESSAGE', () => {
    it('full payload', () => {
      const action = {
        type: types.TE_MESSAGE,
        channel: {
          event: 'subscribed',
          channel: 'trades',
          chanId: 215,
          symbol: 'tBTCUSD',
          pair: 'BTCUSD',
        },
        payload: [
          215,
          'te',
          [
            399251013,
            1573485493000,
            -0.09868591,
            66761,
          ],
        ],
      }
      expect(tradesReducer(initialState, action)).toEqual({
        ...initialState,
        215: {
          ...initialState[215],
          399251013: {
            id: 399251013,
            mts: 1573485493000,
            amount: -0.09868591,
            price: 66761,
          },
        },

      })
    })
    it('channel Id is 0', () => {
      const action = {
        type: types.TE_MESSAGE,
        channel: {
          chanId: 0,
        },
        payload: [
          0,
          'te',
          [],
        ],
      }
      expect(tradesReducer(initialState, action)).toEqual(initialState)
    })
    it('null payload', () => {
      const action = {
        type: types.TE_MESSAGE,
        payload: null,
      }
      expect(tradesReducer(initialState, action)).toEqual(initialState)
    })
  })
})
