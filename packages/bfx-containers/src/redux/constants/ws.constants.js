import { createTypes } from 'redux-action-types'

export const ACTION_PREFIX = 'ufx-core/websocket/'

export const WS_AUTH_CHANNEL_ID = 0

export const WS_EVENT_TYPES = {
  SUBSCRIBE: 'subscribe',
  UNSUBSCRIBE: 'unsubscribe',
  SUBSCRIBED: 'subscribed',
  UNSUBSCRIBED: 'unsubscribed',
  AUTH: 'auth',
  ERROR: 'error',
  PING: 'ping',
}

const types = createTypes(
  ACTION_PREFIX,
  'CONNECT',
  'CONNECTED',
  'DISCONNECT',
  'DISCONNECTED',
  'SUBSCRIBED',
  'UNSUBSCRIBED',
  'SUBSCRIBE',
  'RESUBSCRIBE',
  'UNSUBSCRIBE',
  'MESSAGE',
  'SEND',
  'AUTHENTICATED',
  'BOOK_SNAPSHOT_MESSAGE',
  'BOOK_UPDATE_MESSAGE',
  'BOOK_RESET_MESSAGE',
  'BOOK_TOP_SNAPSHOT_MESSAGE',
  'BOOK_TOP_UPDATE_MESSAGE',
  'BOOK_TOP_RESET_MESSAGE',
  'TRADES_SNAPSHOT_MESSAGE',
  'TRADES_UPDATE_MESSAGE',
  'TU_MESSAGE',
  'TE_MESSAGE',
  'TRADES_RESET_MESSAGE',
  'WS_MESSAGE',
  'WU_MESSAGE',
  'OU_MESSAGE',
  'OS_MESSAGE',
  'ON_MESSAGE',
  'OC_MESSAGE',
  'N_MESSAGE', // notification message
  'CANDLES_SNAPSHOT_MESSAGE',
  'CANDLES_UPDATE_MESSAGE',
)

export default types
