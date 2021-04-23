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
    tag: Tag,
    className,
    uppercase,
    small,
  } = props

  const classes = cx(
    Classes.LABEL,
    className,
    {
      uppercase,
      [Classes.LABEL + Classes.SIZE_SMALL]: small,
    },
  )

  return (
    // eslint-disable-next-line no-undef, react/jsx-props-no-spreading
    <Tag ref={ref} className={classes} {...rest}>
      {label}
    </Tag>
  )
})

Label.propTypes = {
  /**
   * The label of the Label.
   */
  label: PropTypes.node.isRequired,
  /**
   * The tag of the Label.
   */
  // do not use lodash methods/_values to show correct prop-types in storybook props table
  tag: PropTypes.oneOf(Object.values(LABEL_TAGS)),
  /**
   * The className of the Label.
   */
  className: PropTypes.string,
  /**
   * If true, shows the text of the Label in uppercase.
   */
  uppercase: PropTypes.bool,
  /**
   * If true, shows the Label in a small style.
   */
  small: PropTypes.bool,
}

Label.defaultProps = {
  tag: LABEL_TAGS.SPAN,
  className: null,
  uppercase: false,
  small: false,
}

export default Label
