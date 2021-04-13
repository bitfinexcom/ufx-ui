import React, { memo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Notifications } from '../../components/ui'
import useInterval from '../../hooks/useInterval'
import { getNewNotifications } from '../../redux/selectors/notifications.selectors'
import { notifications as config } from '../../var/config'

const NotificationsContainer = () => {
  const notifications = useSelector(getNewNotifications)
  const [newNotifications, setNewNotifications] = useState([])

  useEffect(() => {
    setNewNotifications(notifications)
  }, [notifications])

  const checkNotificationsTime = () => {
    const nextNotifications = notifications.filter(n => n.mts > new Date().getTime() - config.DEFAULT_TIMEOUT_MS)

    setNewNotifications(nextNotifications)
  }

  useInterval(() => checkNotificationsTime(), config.REFRESH_NOTIFICATIONS)

  return (
    <Notifications notifications={newNotifications} />
  )
}

export default memo(NotificationsContainer)
