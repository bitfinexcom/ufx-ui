import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { memo, forwardRef } from 'react'

import * as Classes from '../../../common/classes'

// eslint-disable-next-line prefer-arrow-callback
const Spinner = forwardRef(function Spinner(props, ref) {
  const { useMarginWrapper, size, className } = props

  return (
    <div
      className={cx(Classes.SPINNER, className, {
        [`${Classes.SPINNER}__margin-wrapper`]: useMarginWrapper,
      })}
      ref={ref}
    >
      <FontAwesomeIcon
        icon={faCircleNotch}
        size={size}
        spin
        className='fast-spin'
      />
    </div>
  )
})

Spinner.propTypes = {
  /**
   * If true, add a margin top.
   */
  useMarginWrapper: PropTypes.bool,
  /**
   * The size of the Spinner.
   */
  size: PropTypes.string,
  /**
   * The className of the Spinner.
   */
  className: PropTypes.string,
}

Spinner.defaultProps = {
  useMarginWrapper: true,
  size: 'lg',
  className: null,
}

export default memo(Spinner)
