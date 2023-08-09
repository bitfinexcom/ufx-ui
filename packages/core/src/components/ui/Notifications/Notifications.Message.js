import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import _map from 'lodash/map'
import _size from 'lodash/size'
import React, { useState, memo } from 'react'

import { getIcon } from './Notifications.helpers'
import { PROP_NOTIFICATION } from './Notifications.props'
import * as Classes from '../../../common/classes'

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

  const intentModifier = Classes.intentSuffix(level)
  const classes = cx(`${Classes.NOTIFICATIONS}__level`, { [`${Classes.NOTIFICATIONS}__level${intentModifier}`]: intentModifier })

  const onClose = () => _onClose(notification)

  return (
    <div className={classes}>
      {_onClose && <p className='close-button' onClick={onClose} aria-hidden='true'>&#10005;</p>}
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

NotificationMessage.defaultProps = {
  onClose: null,
}

export default memo(NotificationMessage)
