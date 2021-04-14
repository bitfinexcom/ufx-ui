import cx from 'classnames'
import React from 'react'

import * as Classes from '../../../common/classes'

export default function Truncate({ className, children, ...props }) {
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
