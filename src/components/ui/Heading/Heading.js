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
    style,
    intent,
    alignText,
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
      style={style}
    >{children}
    </Tag>
  )
})

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  // do not use lodash methods/_values to show correct prop-types in storybook props table
  tag: PropTypes.oneOf(Object.values(HEADING_TAGS)),
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  intent: PropTypes.oneOf(INTENT_TYPES_ARR),
  alignText: PropTypes.oneOf(Object.values(TEXT_ALIGNMENT)),
}

Heading.defaultProps = {
  tag: HEADING_TAGS.H2,
  className: null,
  style: null,
  intent: Intent.NONE,
  alignText: TEXT_ALIGNMENT.LEFT,
}

export default Heading
