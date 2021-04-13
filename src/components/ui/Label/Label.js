import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'

import * as Classes from '../../../common/classes'

export const LABEL_TAGS = {
  SPAN: 'span',
  DIV: 'div',
}

// eslint-disable-next-line prefer-arrow-callback
const Label = forwardRef(function Label(props, ref) {
  const {
    label,
    tag,
    className,
    style,
    uppercase,
    small,
  } = props
  const ElementType = tag
  const classes = cx(
    Classes.LABEL,
    className,
    {
      uppercase,
      [Classes.LABEL + Classes.SIZE_SMALL]: small,
    },
  )

  return (
    <ElementType ref={ref} className={classes} style={style}>
      {label}
    </ElementType>
  )
})

Label.propTypes = {
  label: PropTypes.node.isRequired,
  // do not use lodash methods/_values to show correct prop-types in storybook props table
  tag: PropTypes.oneOf(Object.values(LABEL_TAGS)),
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  uppercase: PropTypes.bool,
  small: PropTypes.bool,
}

Label.defaultProps = {
  tag: LABEL_TAGS.SPAN,
  className: null,
  style: null,
  uppercase: false,
  small: false,
}

export default Label
