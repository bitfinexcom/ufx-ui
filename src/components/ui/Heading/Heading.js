import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'

import * as Classes from '../../../common/classes'
import Intent, { INTENT_TYPES_ARR } from '../../../common/intent'
import * as Props from '../../../common/props'

const { TEXT_ALIGNMENT } = Props

export const HEADING_TAGS = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
}

// eslint-disable-next-line prefer-arrow-callback
const Heading = forwardRef(function Heading(props, ref) {
  const {
    children,
    tag: Tag,
    className,
    intent,
    alignText,
    ...rest
  } = props
  const intentModifier = Classes.intentSuffix(intent)
  const classes = cx(
    Classes.HEADING,
    className,
    Classes.HEADING + Classes.alignmentModifier(alignText),
    {
      [Classes.HEADING + intentModifier]: !!intentModifier,
    },
  )

  return (
    <Tag
      ref={ref}
      className={classes}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </Tag>
  )
})

Heading.propTypes = {
  /**
   * The children of the Heading.
   */
  children: PropTypes.node.isRequired,
  /**
   * The tag of the Heading.
   */
  // do not use lodash methods/_values to show correct prop-types in storybook props table
  tag: PropTypes.oneOf(Object.values(HEADING_TAGS)),
  /**
   * The className of the Heading.
   */
  className: PropTypes.string,
  /**
   * The intent of the Heading.
   */
  intent: PropTypes.oneOf(INTENT_TYPES_ARR),
  /**
   * The alignment of the text of the Heading.
   */
  alignText: PropTypes.oneOf(Object.values(TEXT_ALIGNMENT)),
}

Heading.defaultProps = {
  tag: HEADING_TAGS.H2,
  className: null,
  intent: Intent.NONE,
  alignText: TEXT_ALIGNMENT.LEFT,
}

export default Heading
