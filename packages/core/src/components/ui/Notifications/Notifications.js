import PropTypes from 'prop-types'
import React, { memo, forwardRef } from 'react'

import * as Classes from '../../../common/classes'
import { groupNotifications } from './Notifications.helpers'
import NotificationMessage from './Notifications.Message'
import { PROP_NOTIFICATION } from './Notifications.props'

// eslint-disable-next-line prefer-arrow-callback
const Notifications = forwardRef(function Notifications(props, ref) {
  const { notifications } = props
  const groupedNotifications = groupNotifications(notifications)

  return (
    <div ref={ref} className={Classes.NOTIFICATIONS}>
      <div className={`${Classes.NOTIFICATIONS}__wrapper`}>
        {groupedNotifications.map(notification => (
          <NotificationMessage
            key={notification.cid}
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
}

Notifications.defaultProps = {
  notifications: [],
}
export default memo(Notifications)
