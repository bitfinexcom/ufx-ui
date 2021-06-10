import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import React, { useState } from 'react'

import * as Classes from '../../../common/classes'
import { getIcon } from './Notifications.helpers'
import { PROP_NOTIFICATION } from './Notifications.props'

const NotificationMessage = (props) => {
  const {
    level,
    message,
    group,
    onClose,
  } = props
  const [groupIsExpanded, setGroupIsExpanded] = useState(false)
  const classes = cx(`${Classes.NOTIFICATIONS}__level`, `${Classes.NOTIFICATIONS}__level--${level}`)

  return (
    <div className={classes}>
      {onClose && <p className='close-button' onClick={onClose}>&#10005;</p>}
      <div className='message'>
        <div className='icon'>
          <FontAwesomeIcon icon={getIcon(level)} />
        </div>

        <ul>
          {group && groupIsExpanded
            ? group.map(groupedMessage => (
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
        {groupIsExpanded ? 'Collapse' : `Expand (${group.length} more)`}
      </button>
      )}
    </div>
  )
}

NotificationMessage.propTypes = PROP_NOTIFICATION

export default NotificationMessage
