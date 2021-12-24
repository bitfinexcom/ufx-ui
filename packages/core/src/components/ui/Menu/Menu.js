/* eslint-disable react/jsx-props-no-spreading */
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { forwardRef, memo } from 'react'

import * as Classes from '../../../common/classes'

// eslint-disable-next-line prefer-arrow-callback
export const Menu = forwardRef(function Menu({ children, className, ...props }, ref) {
  return (
    <ul className={cx(Classes.MENU, className)} ref={ref} {...props}>
      {children}
    </ul>
  )
})

Menu.propTypes = {
  /**
   * The children of the Menu.
   */
  children: PropTypes.node.isRequired,
  /**
   * The className of the Menu.
   */
  className: PropTypes.string,
}

Menu.defaultProps = {
  className: '',
}

export default memo(Menu)
