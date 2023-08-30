import bookReducer, { INITIAL_STATE } from './book.reducer'
import types from '../constants/ws.constants'

describe('REDUCER: book', () => {
  describe('action: BOOK_SNAPSHOT_MESSAGE', () => {
    it('channel is not existed', () => {
      const action = {
        type: types.BOOK_SNAPSHOT_MESSAGE,
        channel: {
          event: 'subscribed',
          channel: 'book',
          chanId: 135180,
          symbol: 'tBTCUSD',
          prec: 'P0',
          freq: 'F0',
          len: '100',
          pair: 'BTCUSD',
        },
        payload: [
          135180,
          [
            [60874, 0, 1],
            [61063, 1, -0.0838],
          ],
        ],
      }
      expect(bookReducer(INITIAL_STATE, action)).toEqual({
        ...INITIAL_STATE,
        135180: {
          channel: {
            event: 'subscribed',
            channel: 'book',
            chanId: 135180,
            symbol: 'tBTCUSD',
            prec: 'P0',
            freq: 'F0',
            len: '100',
            pair: 'BTCUSD',
          },
          snapshotReceived: true,
          asks: {
            61063: {
              price: 61063,
              count: 1,
              amount: -0.0838,
            },
          },
          bids: {
            60874: {
              amount: 1,
              count: 0,
              price: 60874,
            },
          },
        },
      })
    })
    it('channel is existed', () => {
      const initialState = {
        ...INITIAL_STATE,
        135180: {
          channel: {
            event: 'subscribed',
            channel: 'book',
            chanId: 135180,
            symbol: 'tBTCUSD',
            prec: 'P0',
            freq: 'F0',
            len: '100',
            pair: 'BTCUSD',
          },
          snapshotReceived: true,
          asks: {
            61063: {
              price: 61063,
              count: 1,
              amount: -0.0838,
            },
          },
          bids: {
            60874: {
              amount: 1,
              count: 0,
              price: 60874,
            },
          },
        },
      }
      const action = {
        type: types.BOOK_SNAPSHOT_MESSAGE,
        channel: {
          event: 'subscribed',
          channel: 'book',
          chanId: 135180,
          symbol: 'tBTCUSD',
          prec: 'P0',
          freq: 'F0',
          len: '100',
          pair: 'BTCUSD',
        },
        payload: [
          135180,
          [
            [60874, 1, 1.586],
            [61063, 1, -1.0838],
          ],
        ],
      }
      expect(bookReducer(initialState, action)).toEqual({
        ...initialState,
        135180: {
          ...initialState[135180],
          asks: {
            61063: {
              price: 61063,
              count: 1,
              amount: -1.0838,
            },
          },
          bids: {
            60874: {
              amount: 1.586,
              count: 1,
              price: 60874,
            },
          },
        },
      })
    })
    it('empty snapshots', () => {
      const action = {
        type: types.BOOK_SNAPSHOT_MESSAGE,
        payload: null,
      }
      expect(bookReducer(INITIAL_STATE, action)).toEqual(INITIAL_STATE)
    })
  })

  const initialState = {
    ...INITIAL_STATE,
    600065: {
      bid: {},
      ask: {},
    },
    600010: {
      bid: {},
      ask: {},
    },
  }
  describe('action: UNSUBSCRIBED', () => {
    it('status is OK', () => {
      const action = {
        type: types.UNSUBSCRIBED,
        payload: {
          status: 'OK',
          chanId: 600065,
        },
      }
      expect(bookReducer(initialState, action)).toEqual({
        ...INITIAL_STATE,
        600010: {
          bid: {},
          ask: {},
        },
      })
    })
    it('status is failed', () => {
      const action = {
        type: types.UNSUBSCRIBED,
        payload: {
          status: 'FAILED',
          chanId: 600065,
        },
      }
      expect(bookReducer(initialState, action)).toEqual(initialState)
    })
    it('channel is not existed', () => {
      const action = {
        type: types.UNSUBSCRIBED,
        payload: {
          status: 'OK',
          chanId: 50000,
        },
      }
      expect(bookReducer(initialState, action)).toEqual(initialState)
    })
    it('empty payload', () => {
      const action = {
        type: types.UNSUBSCRIBED,
        payload: {},
      }
      expect(bookReducer(initialState, action)).toEqual(initialState)
    })
  })

  describe('action: BOOK_TOP_RESET_MESSAGE', () => {
    it('should reset state', () => {
      const action = {
        type: types.BOOK_RESET_MESSAGE,
      }
      expect(bookReducer(initialState, action)).toEqual(INITIAL_STATE)
    })
  })
})
