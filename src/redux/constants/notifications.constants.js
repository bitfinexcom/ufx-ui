import { createTypes } from 'redux-action-types'

export const WS_NOTIFICATION_TTL = 6 * 1000

const types = createTypes(
  'ufx-core/notifications/',
  'NOTIFY',
)

export default types
