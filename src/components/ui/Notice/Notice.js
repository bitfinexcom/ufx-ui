import {
  faInfoCircle, faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'

import * as Classes from '../../../common/classes'
import { NOTICE_TYPES } from './Notice.constants'

const {
  NONE, INFO, WARNING, SUCCESS, ERROR,
} = NOTICE_TYPES

const NOTICE_ICONS = {
  [NONE]: faInfoCircle,
  [INFO]: faInfoCircle,
  [SUCCESS]: faInfoCircle,
  [WARNING]: faExclamationTriangle,
  [ERROR]: faExclamationTriangle,
}

// eslint-disable-next-line prefer-arrow-callback
const Notice = forwardRef(function Notice(props, ref) {
  const {
    type,
    icon,
    title,
    children,
  } = props
  const wrapperClasses = classNames(Classes.NOTICE, type)

  return (
    <div ref={ref} className={wrapperClasses}>
      {icon || (
        <FontAwesomeIcon icon={NOTICE_ICONS[type]} className='icon' />
      )}
      {' '}
      <strong>
        {title}
      </strong>
      {' '}
      {children}
    </div>
  )
})

Notice.propTypes = {
  type: PropTypes.oneOf(Object.values(NOTICE_TYPES)),
  children: PropTypes.node.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  icon: PropTypes.node,
}

Notice.defaultProps = {
  type: INFO,
  title: undefined,
  icon: undefined,
}

export default Notice
