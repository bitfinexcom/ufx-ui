import _throttle from 'lodash/throttle'
import _toUpper from 'lodash/toUpper'

import { signWithApiKey } from '../../functions/api_auth'
import types, { ACTION_PREFIX, WS_AUTH_CHANNEL_ID, WS_EVENT_TYPES } from '../constants/ws.constants'

const WS_CONNECT_THROTTLE_MS = 1000

export const WSConnect = (payload) => ({ type: types.CONNECT, payload })

export const WSConnectThrottled = _throttle((dispatch, payload) => dispatch(WSConnect(payload)), WS_CONNECT_THROTTLE_MS, {
  leading: true,
  trailing: false,
})

export const WSConnected = () => ({ type: types.CONNECTED })

export const WSDisconnect = () => ({ type: types.DISCONNECT })
export const WSDisconnected = () => ({ type: types.DISCONNECTED })

export const WSSubscribed = (payload) => ({ type: types.SUBSCRIBED, payload })
export const WSUnsubscribed = (payload) => ({ type: types.UNSUBSCRIBED, payload })
export const WSSubscribeChannel = (payload) => ({ type: types.SUBSCRIBE, payload })
export const WSUnsubscribeChannel = (payload) => ({ type: types.UNSUBSCRIBE, payload })
export const WSResubscribeChannel = (payload) => ({ type: types.RESUBSCRIBE, payload })

export const WSMessage = (payload) => ({ type: types.MESSAGE, payload })
export const WSSend = (payload) => ({ type: types.SEND, payload })

export const WSAuthenticated = (payload) => ({ type: types.AUTHENTICATED, payload })

export const resetChannelState = (channel) => ({ type: `${ACTION_PREFIX}${_toUpper(channel)}_RESET_MESSAGE` })

export const WSSubscribeAuthChannel = () => {
  const payload = signWithApiKey()
  return WSSend({
    event: WS_EVENT_TYPES.AUTH,
    ...payload,
  })
}

export const WSUnsubscribeAuthChannel = () => WSSend({
  event: WS_EVENT_TYPES.UNSUBSCRIBE,
  chanId: WS_AUTH_CHANNEL_ID,
})
