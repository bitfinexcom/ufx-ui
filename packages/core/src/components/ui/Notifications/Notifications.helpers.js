import {
  faInfo, faExclamationCircle, faBan, faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'

import Intent from '../../../common/intent'

const GROUPING_INTERVAL_MS = 30 * 1000

/**
 * @param {Object} notificationA - first notification
 * @param {Object} notificationB - second notification
 * @return {boolean} groupable
 */
export const canBeGrouped = (notificationA = {}, notificationB = {}) => (
  (notificationA.level === notificationB.level)
    && Math.abs(notificationA.mts - notificationB.mts) < GROUPING_INTERVAL_MS
)

/**
 * Adds a notification to a group, whether it is already grouped or not. Returns
 * a new group with both notifications merged.
 *
 * Can be used to merge multiple groups; n is preferred over groupN for the
 * primary label.
 *
 * @param {Object} notification - notification to add to group, used for primary label
 * @param {Object} groupN - optional, defaults to empty group
 * @return {Object} newGroupN
 */
export const mergeCreateGroup = (notification = {}, groupN = {}) => ({
  mts: groupN.mts || notification.mts,
  cid: groupN.cid || notification.cid,
  message: notification.message || groupN.message,
  level: groupN.level || notification.level,
  group: [
    ...(groupN.group || [groupN]),
    ...(notification.group || [notification]),
  ],
})

export const groupNotifications = (notifications = []) => {
  const groupedNotifications = notifications.reduce((all, current) => {
    if (all.length === 0) {
      return [current]
    }

    const prevIndex = all.length - 1
    const prevNotification = all[prevIndex]
    const grouped = canBeGrouped(current, prevNotification)

    if (!grouped) {
      // should not be grouped, append item
      return [...all, current]
    }

    // should be grouped, replace last index
    return all.map((item, idx) => {
      if (idx === prevIndex) {
        return mergeCreateGroup(current, prevNotification)
      }
      return item
    })
  }, [])

  // after calculating the groups, we reverse the array to allow newest groups on top
  return groupedNotifications.reverse()
}

export const getIcon = (level) => {
  switch (level) {
    case Intent.NONE: {
      return faInfo
    }
    case Intent.PRIMARY: {
      return faInfo
    }
    case Intent.SUCCESS: {
      return faCheckCircle
    }
    case Intent.WARNING: {
      return faExclamationCircle
    }
    case Intent.ERROR: {
      return faBan
    }
    default: {
      return faInfo
    }
  }
}
