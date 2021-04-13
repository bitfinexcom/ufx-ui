/* eslint-disable react/jsx-props-no-spreading */
import cx from 'classnames'
import React from 'react'

import * as Classes from '../../../common/classes'

export default function MenuDivider({ className, ...props }) {
  return (
    <div className={cx(`${Classes.MENU}__divider`, className)} {...props} />
  )
}
