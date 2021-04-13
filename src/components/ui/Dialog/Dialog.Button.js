import cx from 'classnames'
import React from 'react'

import Intent from '../../../common/intent'
import Button from '../Button'

export default function DialogButton({
  primary, secondary, className, ...props
}) {
  let intent

  if (primary) {
    intent = Intent.PRIMARY
  }

  if (secondary) {
    intent = Intent.SECONDARY
  }

  return (
    <Button
      className={cx('modal__button', className)}
      small
      intent={intent}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}
