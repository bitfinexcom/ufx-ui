import _get from 'lodash/get'

import { notifications as config } from '../../var/config'
import { getUfxState } from './common'

const EMPTY_ARR = []

const getReducer = state => _get(getUfxState(state), 'notifications', EMPTY_ARR)

export const getNewNotifications = state => getReducer(state)
  .filter(n => n.mts > new Date().getTime() - config.DEFAULT_TIMEOUT_MS)

export default {
  getNewNotifications,
}
