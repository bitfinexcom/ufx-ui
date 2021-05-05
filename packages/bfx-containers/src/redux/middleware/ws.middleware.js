import { i18n } from '@ufx-ui/core'
import _get from 'lodash/get'

import { wssUrl } from '../../functions/config.selectors'
import {
  notifySuccess,
  notifyError,
} from '../actions/notifications.actions'
import {
  WSConnectThrottled,
  WSConnected,
  WSDisconnected,
  WSMessage,
} from '../actions/ws.actions'
import types from '../constants/ws.constants'
import { getWSConnected, getWSReconnectRetries } from '../selectors/ws.selectors'

const MAX_RECONNECT_DELAY = 30000 // 30s
const ADDED_RECONNECT_DELAY_PER_RETRY = 2000
const getReconnectDelay = (reconnectRetries) => (
  Math.min(ADDED_RECONNECT_DELAY_PER_RETRY * reconnectRetries, MAX_RECONNECT_DELAY)
)

const SOCKET_STATE_OPEN = 1

const isOffline = (socket) => (_get(socket, 'readyState') !== SOCKET_STATE_OPEN)

const onOpen = ({ dispatch }) => () => {
  dispatch(WSConnected())
  dispatch(notifySuccess(i18n.t('common:websocket_connected')))
}

const onClose = (args) => () => {
  const { dispatch, store } = args
  const state = store.getState()
  const isWSConnected = getWSConnected(state)
  const reconnectRetries = getWSReconnectRetries(state)

  // show notification if prev state is isWSConnected:true and onClose event is triggered
  if (isWSConnected) {
    dispatch(notifyError(i18n.t('common:websocket_disconnected')))
  }
  dispatch(WSDisconnected())
  // eslint-disable-next-line no-param-reassign
  args.websocket = null

  setTimeout(() => {
    WSConnectThrottled(dispatch, {
      reconnectRetries: reconnectRetries + 1,
    })
  },
  getReconnectDelay(reconnectRetries))
}

/**
 * middleware to handle WebSocket connections.
 */
const wsMiddleware = () => {
  let websocket

  return (store) => next => action => {
    const { dispatch } = store
    const { type, payload } = action

    switch (type) {
      // User request to connect
      case types.CONNECT:
        // Configure the websocket object
        websocket = new WebSocket(wssUrl)

        // Attach the callbacks
        websocket.onopen = onOpen({ dispatch })
        websocket.onclose = onClose({ dispatch, store, websocket })
        websocket.onmessage = (event) => dispatch(WSMessage({ event }))

        break

      // User request to send a message
      case types.SEND:
        if (isOffline(websocket)) {
          break
        }
        websocket.send(JSON.stringify(payload))
        break

      // User request to disconnect
      case types.DISCONNECT:
        if (!websocket) {
          break
        }
        websocket.close()
        break

      default:
        break
    }

    return next(action)
  }
}

export default wsMiddleware
