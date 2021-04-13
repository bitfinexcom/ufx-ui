import _isFinite from 'lodash/isFinite'

import { WS_NOTIFICATION_TTL } from '../constants/notifications.constants'

/**
 * Converts array -> pojo
 *
 * @param {*[]} arr - ws2-format notification
 * @return {Object} - internal POJO notification
 */
const notificationsAdapter = (arr = []) => {
  const mts = _isFinite(arr[0])
    ? new Date(arr[0])
    : arr[0]
  const mid = arr[2]
  const sound = typeof arr[3] === 'object' ? arr[3] : null
  const data = arr[4] || {}
  const tag = arr[1]
  const status = arr[6]
  const level = (data.type || status || 'info').toLowerCase()
  const message = arr[7] || data.message || ''

  return {
    type: 'all', // desktop & browser
    sound,
    level,
    message,

    // extra metadata from ws2
    tag,
    status: status || data.type || '',
    data,
    mid,
    mts,

    ttl: WS_NOTIFICATION_TTL,
  }
}

export default notificationsAdapter
