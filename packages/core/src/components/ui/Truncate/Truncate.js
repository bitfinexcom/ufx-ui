import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'

import * as Classes from '../../../common/classes'
import Tooltip from '../Tooltip'

// eslint-disable-next-line prefer-arrow-callback
const Truncate = forwardRef(function Truncate({
  limit, className, children, ...rest
}, ref) {
  return (
    <div ref={ref} className={cx(Classes.TRUNCATE, className)}>
      <Tooltip
        content={children}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        className={`${Classes.TRUNCATE}--tooltip`}
      >
        {children}
      </Tooltip>
    </div>
  )
})

Truncate.defaultProps = {
  className: null,
}

Truncate.propTypes = {
  /**
   * The className of the Truncate.
   */
  className: PropTypes.string,
  /**
   * The children of the Truncate.
   */
  children: PropTypes.string.isRequired,
}

export default Truncate
