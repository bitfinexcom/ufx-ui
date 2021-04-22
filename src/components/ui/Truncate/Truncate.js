import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import * as Classes from '../../../common/classes'

function Truncate({ className, children, ...props }) {
  return (
    <span
      className={cx(Classes.TRUNCATE, className)}
      title={typeof children === 'string' ? children : undefined}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </span>
  )
}

Truncate.prototype = {
  /**
   * The className of the Truncate.
   */
  className: PropTypes.string,
  /**
   * The children of the Truncate.
   */
  children: PropTypes.string,
}

export default Truncate
