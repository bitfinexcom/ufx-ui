/* eslint-disable react/jsx-props-no-spreading */
import cx from 'classnames'
import React from 'react'

import * as Classes from '../../../common/classes'

export default function Menu({ children, className, ...props }) {
  return (
    <ul className={cx(Classes.MENU, className)} {...props}>
      {children}
    </ul>
  )
}
