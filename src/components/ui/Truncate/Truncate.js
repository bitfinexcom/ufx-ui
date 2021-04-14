import cx from 'classnames'
import React from 'react'

import * as Classes from '../../../common/classes'

export default function Truncate({ className, children, ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <span className={cx(Classes.TRUNCATE, className)} {...props}>
      {children}
    </span>
  )
}
