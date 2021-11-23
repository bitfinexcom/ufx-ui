import types from '../constants/ws.constants'
import WSReducer, { INITIAL_STATE } from './ws.reducer'

describe('REDUCER: WS', () => {
  describe('action: CONNECT', () => {
    it('full payload', () => {
      const action = {
        type: types.CONNECT,
        payload: {
          reconnectRetries: 1,
        },
      }
      expect(WSReducer(INITIAL_STATE, action)).toEqual({
        ...INITIAL_STATE,
        reconnectRetries: 1,
      })
    })
    it('empty payload', () => {
      const initialState = {
        ...INITIAL_STATE,
        reconnectRetries: 2,
      }
      const action = {
        type: types.CONNECT,
      }
      expect(WSReducer(initialState, action)).toEqual({
        ...initialState,
        reconnectRetries: 0,
      })
    })
  })

  describe('action: CONNECTED', () => {
    it('success connected', () => {
      const action = {
        type: types.CONNECTED,
      }
      const initialState = {
        ...INITIAL_STATE,
        reconnectRetries: 2,
      }
      expect(WSReducer(initialState, action)).toEqual({
        ...initialState,
        connected: true,
        reconnectRetries: 0,
      })
    })
  })

  describe('action: DISCONNECTED', () => {
    it('success disconnected', () => {
      const initialState = {
        ...INITIAL_STATE,
        connected: true,
        channels: {
          45: {},
          55: {},
        },
      }
      const action = {
        type: types.DISCONNECTED,
      }
      expect(WSReducer(initialState, action)).toEqual({
        ...initialState,
        connected: false,
        channels: undefined,
      })
    })
  })

  const initialState = {
    ...INITIAL_STATE,
    connected: true,
    channels: {
      58: { chanId: 58, data: [] },
      8: { chanId: 8, data: [] },
    },
  }
  describe('action: SUBSCRIBED', () => {
    it('full payload', () => {
      const action = {
        type: types.SUBSCRIBED,
        payload: { chanId: 25, data: [] },
      }
      expect(WSReducer(initialState, action)).toEqual({
        ...initialState,
        channels: {
          ...initialState.channels,
          25: { chanId: 25, data: [] },
        },
      })
    })
    it('empty payload', () => {
      const action = {
        type: types.SUBSCRIBED,
        payload: {},
      }
      expect(WSReducer(initialState, action)).toEqual(initialState)
    })
  })

  describe('action: UNSUBSCRIBED', () => {
    it('full payload, status is OK', () => {
      const action = {
        type: types.UNSUBSCRIBED,
        payload: {
          chanId: 58, status: 'OK',
        },
      }
      expect(WSReducer(initialState, action)).toEqual({
        ...initialState,
        channels: {
          8: { chanId: 8, data: [] },
        },
      })
    })

    it('full payload, status isn`t OK', () => {
      const action = {
        type: types.UNSUBSCRIBED,
        payload: {
          chanId: 58, status: 'CANCELLED',
        },
      }
      expect(WSReducer(initialState, action)).toEqual(initialState)
    })

    it('empty payload', () => {
      const action = {
        type: types.UNSUBSCRIBED,
        payload: { },
      }
      expect(WSReducer(initialState, action)).toEqual(initialState)
    })
  })

  describe('action: AUTHENTICATED', () => {
    it('full payload', () => {
      const action = {
        type: types.AUTHENTICATED,
        payload: {
          data: [],
        },
      }
      expect(WSReducer(initialState, action)).toEqual({
        ...initialState,
        auth: { data: [] },
        channels: {
          ...initialState.channels,
          0: { data: [] },
        },
      })
    })

    it('empty payload', () => {
      const action = {
        type: types.AUTHENTICATED,
        payload: null,
      }
      expect(WSReducer(initialState, action)).toEqual({
        ...initialState,
        auth: null,
        channels: {
          ...initialState.channels,
          0: null,
        },
      })
    })
  })
})
