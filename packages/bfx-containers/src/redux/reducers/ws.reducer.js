import _isNull from 'lodash/isNull'
import _omit from 'lodash/omit'

import types, { WS_AUTH_CHANNEL_ID } from '../constants/ws.constants'

export const INITIAL_STATE = {
  connected: false,
  reconnectRetries: 0,
}

const reducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action
  const { reconnectRetries = 0 } = payload || {}

  switch (type) {
    case types.CONNECT: {
      return {
        ...state,
        reconnectRetries,
      }
    }

    case types.CONNECTED: {
      return {
        ...state,
        connected: true,
        reconnectRetries: 0,
      }
    }

    case types.DISCONNECTED: {
      return {
        ...state,
        connected: false,
        channels: undefined,
      }
    }

    // {
    //   "event": "subscribed",
    //   "channel": "ticker",
    //   "chanId": 26,
    //   "symbol": "fUSD",
    //   "currency": "USD"
    // }
    case types.SUBSCRIBED: {
      const { chanId = null } = payload
      if (_isNull(payload) || _isNull(chanId)) {
        return state
      }

      return {
        ...state,
        channels: {
          ...state.channels,
          [chanId]: payload,
        },
      }
    }

    // {
    //   "event": "unsubscribed",
    //   "status": "OK",
    //   "chanId": 26
    // }
    case types.UNSUBSCRIBED: {
      if (_isNull(payload)) {
        return state
      }
      const { chanId, status } = payload
      if (status !== 'OK') {
        return state
      }

      return {
        ...state,
        channels: _omit(state.channels, [chanId]),
      }
    }

    // {
    //   "event": "auth",
    //   "status": "OK" or "FAILED",
    //   "chanId": 0,
    //   "userId": 254278,
    //   "auth_id": "a7349896-d598-432e-95f0-67c50e2a022e",
    //   "caps": { "orders": { "read": 1, "write": 0 }, ... }
    //   "code": 10114,
    //   "msg": "nonce: small"
    // }
    case types.AUTHENTICATED: {
      return {
        ...state,
        auth: payload,
        channels: {
          ...state.channels,
          [WS_AUTH_CHANNEL_ID]: payload,
        },
      }
    }

    default:
      return state
  }
}

export default reducer
