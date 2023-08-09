import cx from 'classnames'
import _map from 'lodash/map'
import PropTypes from 'prop-types'
import React, { memo, forwardRef } from 'react'

import { groupNotifications } from './Notifications.helpers'
import NotificationMessage from './Notifications.Message'
import { PROP_NOTIFICATION } from './Notifications.props'
import * as Classes from '../../../common/classes'

// eslint-disable-next-line prefer-arrow-callback
export const Notifications = forwardRef(function Notifications(props, ref) {
  const { notifications, className, onClose } = props
  const groupedNotifications = groupNotifications(notifications)

  return (
    <div ref={ref} className={cx(Classes.NOTIFICATIONS, className)}>
      <div className={`${Classes.NOTIFICATIONS}__wrapper`}>
        {_map(groupedNotifications, notification => (
          <NotificationMessage
            key={notification.cid}
            onClose={onClose}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...notification}
          />
        ))}
      </div>
    </div>
  )
})

Notifications.propTypes = {
  /**
   * The notifications of the Notifications.
   * Notification object should have required params (strings): cid , message, level.
   */
  notifications: PropTypes.arrayOf(PropTypes.shape(PROP_NOTIFICATION)),
  /**
   * Pass custom className to the notification wrapper.
   */
  className: PropTypes.string,
  /**
   * A function which is called when user presses close button.
   */
  onClose: PropTypes.func,
}

Notifications.defaultProps = {
  notifications: [],
  className: '',
  onClose: () => {},
}
export default memo(Notifications)
