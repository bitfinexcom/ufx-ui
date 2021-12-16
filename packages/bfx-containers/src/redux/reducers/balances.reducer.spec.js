import types from '../constants/ws.constants'
import balanceReducer, { INITIAL_STATE } from './balances.reducer'

describe('REDUCER: balances', () => {
  describe('action: WS_MESSAGE', () => {
    it('empty payload', () => {
      const action = {
        type: types.WS_MESSAGE,
        payload: null,
      }
      expect(balanceReducer(INITIAL_STATE, action)).toEqual(INITIAL_STATE)
    })

    it('empty rowData', () => {
      const action = {
        type: types.WS_MESSAGE,
        payload: [null, null, []],
      }
      expect(balanceReducer(INITIAL_STATE, action)).toEqual({
        ...INITIAL_STATE,
        wallets: {},
        snapshotReceived: true,
      })
    })

    it('full rowData', () => {
      const action = {
        type: types.WS_MESSAGE,
        payload: [
          null,
          null,
          [
            ['exchange', 'BTC', 5, null, 3],
            ['funding', 'ETH', 0.5, null, 0.1],
          ],
        ],
      }
      expect(balanceReducer(INITIAL_STATE, action)).toEqual({
        ...INITIAL_STATE,
        wallets: {
          BTC: {
            exchange: {
              available: 3,
              total: 5,
            },
          },
        },
        snapshotReceived: true,
      })
    })
  })
  describe('action: WU_MESSAGE', () => {
    const initialState = {
      ...INITIAL_STATE,
      wallets: {
        BTC: {
          exchange: {
            available: 3,
            total: 5,
          },
        },
      },
    }

    it('empty payload', () => {
      const action = {
        type: types.WU_MESSAGE,
        payload: null,
      }
      expect(balanceReducer(initialState, action)).toEqual(initialState)
    })
    it('empty rowData', () => {
      const action = {
        type: types.WU_MESSAGE,
        payload: [null, null, []],
      }
      expect(balanceReducer(initialState, action)).toEqual(initialState)
    })
    it('is not exchange type of wallet', () => {
      const action = {
        type: types.WU_MESSAGE,
        payload: [null, null, ['funding', 'ETH', 0.5, null, 0.1]],
      }
      expect(balanceReducer(initialState, action)).toEqual(initialState)
    })

    it('full rowData', () => {
      const action = {
        type: types.WU_MESSAGE,
        payload: [null, null, ['exchange', 'ETH', 10, null, 8.2]],
      }
      expect(balanceReducer(initialState, action)).toEqual({
        ...initialState,
        wallets: {
          BTC: {
            exchange: {
              available: 3,
              total: 5,
            },
          },
          ETH: {
            exchange: {
              available: 8.2,
              total: 10,
            },
          },
        },
      })
    })
  })
})
