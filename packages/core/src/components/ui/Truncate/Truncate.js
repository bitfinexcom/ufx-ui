import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'

import * as Classes from '../../../common/classes'
import Tooltip from '../Tooltip'

// eslint-disable-next-line prefer-arrow-callback
const Truncate = forwardRef(function Truncate({ className, children, ...props }) {
  return (
    <div className={cx(Classes.TRUNCATE, className)}>
      <Tooltip
        content={children}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {children}
      </Tooltip>
    </div>
  )
})

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
