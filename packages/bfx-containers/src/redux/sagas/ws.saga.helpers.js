import _isArray from 'lodash/isArray'
import _isString from 'lodash/isString'
import _toUpper from 'lodash/toUpper'

import { ACTION_PREFIX } from '../constants/ws.constants'

export const isHB = (payload = []) => (payload[1] === 'hb' || payload[2] === 'hb')

export const getChannelAlias = (payload = {}) => {
  const {
    channel,
    len,
    chanId,
  } = payload
  if (chanId === 0) {
    return 'auth'
  }
  if (channel === 'book' && len === '100') {
    return 'book_top'
  }
  return channel
}

export const getCode = (msg = [], channelInfo = { }) => {
  if (!_isArray(msg)) {
    return '?'
  }
  const code = msg[1]
  if (_isString(code)) {
    return code
  }

  const name = getChannelAlias(channelInfo) || '?'
  const suffix = (_isArray(code) && _isArray(code[0])) ? 'snapshot' : 'update'

  return `${name}_${suffix}` // ex. book_update, ticket_snapshot, ?_update
}

// WebSocket message action creator
export const wss = (payload = [], channel) => {
  const code = getCode(payload, channel)
  const type = ACTION_PREFIX + _toUpper(`${code}_MESSAGE`)

  return {
    type,
    channel,
    payload,
  }
}
