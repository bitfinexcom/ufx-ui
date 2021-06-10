import PropTypes from 'prop-types'
import cx from 'classnames'
import React, { memo, forwardRef } from 'react'

import * as Classes from '../../../common/classes'
import { groupNotifications } from './Notifications.helpers'
import NotificationMessage from './Notifications.Message'
import { PROP_NOTIFICATION } from './Notifications.props'

// eslint-disable-next-line prefer-arrow-callback
const Notifications = forwardRef(function Notifications(props, ref) {
  const { notifications, className, onClose } = props
  const groupedNotifications = groupNotifications(notifications)

  return (
    <div ref={ref} className={cx(Classes.NOTIFICATIONS, className)}>
      <div className={`${Classes.NOTIFICATIONS}__wrapper`}>
        {groupedNotifications.map(notification => (
          <NotificationMessage
            key={notification.cid}
            onClose={onClose ? () => onClose(notification) : null}
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
  onClose: null,
}
export default memo(Notifications)
