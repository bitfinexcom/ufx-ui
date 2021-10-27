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
    it('empty payload', () => {
      const action = {
        type: types.WU_MESSAGE,
        payload: null,
      }
      expect(balanceReducer(INITIAL_STATE, action)).toEqual(INITIAL_STATE)
    })
    it('empty rowData', () => {
      const action = {
        type: types.WU_MESSAGE,
        payload: [null, null, []],
      }
      expect(balanceReducer(INITIAL_STATE, action)).toEqual(INITIAL_STATE)
    })
    // it('full rowData', () => {
    //   const initialState = {
    //     ...INITIAL_STATE,
    //     wallets: {
    //       BTC: {
    //         exchange: {
    //           available: 3,
    //           total: 5,
    //         },
    //       },
    //     },
    //   }
    //   const action = {
    //     type: types.WU_MESSAGE,
    //     payload: [null, null, ['exchange']],
    //   }
    //   expect(balanceReducer(initialState, action)).toEqual({
    //     ...initialState,
    //     wallets: {
    //       BTC: {
    //         exchange: {
    //           available: 3,
    //           total: 5,
    //         },
    //       },
    //     },
    //     snapshotReceived: true,
    //   })
    // })
  })
})
