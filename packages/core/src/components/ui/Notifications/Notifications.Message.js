import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import React, { useState, memo } from 'react'
import _size from 'lodash/size'
import _map from 'lodash/map'

import * as Classes from '../../../common/classes'
import { getIcon } from './Notifications.helpers'
import { PROP_NOTIFICATION } from './Notifications.props'

const NotificationMessage = (props) => {
  const {
    onClose: _onClose,
    ...notification
  } = props
  const {
    level,
    message,
    group,
  } = notification
  const [groupIsExpanded, setGroupIsExpanded] = useState(false)
  const classes = cx(`${Classes.NOTIFICATIONS}__level`, `${Classes.NOTIFICATIONS}__level--${level}`)

  const onClose = () => _onClose(notification)

  return (
    <div className={classes}>
      {onClose && <p className='close-button' onClick={onClose} aria-hidden='true'>&#10005;</p>}
      <div className='message'>
        <div className='icon'>
          <FontAwesomeIcon icon={getIcon(level)} />
        </div>

        <ul>
          {group && groupIsExpanded
            ? _map(group, groupedMessage => (
              <li key={groupedMessage.cid}>
                {groupedMessage.message}
              </li>
            ))
            : (
              <li>
                {message}
              </li>
            )}
        </ul>
      </div>

      {group && (
        <button
          type='button'
          className='expand-button'
          onClick={() => setGroupIsExpanded(!groupIsExpanded)}
        >
          {groupIsExpanded ? 'Collapse' : `Expand (${_size(group) - 1} more)`}
        </button>
      )}
    </div>
  )
}

NotificationMessage.propTypes = PROP_NOTIFICATION

export default memo(NotificationMessage)
