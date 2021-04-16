import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { memo, forwardRef } from 'react'

import * as Classes from '../../../common/classes'
import Intent, { INTENT_TYPES_ARR } from '../../../common/intent'

/* disable 'prefer-arrow-callback' to show component display name when using with forwardRef */
// eslint-disable-next-line prefer-arrow-callback
export const Button = forwardRef(function Button(props, ref) {
  const {
    id,
    as: Component,
    children,
    className,
    style,
    loading,
    disabled,
    onClick,
    intent,
    type,
    minimal,
    title,
    small,
    outline,
    ...rest
  } = props

  const intentModifier = Classes.intentSuffix(intent)
  const classes = cx(Classes.BUTTON, className, {
    [Classes.BUTTON + intentModifier]: intentModifier,
    [`${Classes.BUTTON + intentModifier}--outline`]: outline,
    [`${Classes.BUTTON}--minimal`]: minimal,
    [Classes.BUTTON + Classes.SIZE_SMALL]: small,
  })

  return (
    <Component
      ref={ref}
      id={id}
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault()
          e.stopPropagation()
          return
        }
        onClick(e)
      }}
      disabled={disabled || loading}
      className={classes}
      title={title}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
      {loading && <FontAwesomeIcon icon={faCircleNotch} spin size='lg' />}
    </Component>
  )
})

export const BUTTON_TYPES = {
  BUTTON: 'button',
  SUBMIT: 'submit',
}

// do not use lodash methods/_values to show correct prop-types in storybook props table
export const BUTTON_TYPES_ARR = Object.values(BUTTON_TYPES)

Button.propTypes = {
  /**
   * The ID of the Button.
   */
  id: PropTypes.string,
  /**
   * The tag of the Button.
   */
  as: PropTypes.node,
  /**
   * The content of the Button.
   */
  children: PropTypes.node.isRequired,
  /**
   * The className of the Button.
   */
  className: PropTypes.string,
  /**
   * If true, show the loading icon.
   */
  loading: PropTypes.bool,
  /**
   * If true, set the Button to the disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * The function called when the Button is clicked.
   */
  onClick: PropTypes.func,
  /**
   * The intent of the Button.
   */
  intent: PropTypes.oneOf(INTENT_TYPES_ARR),
  /**
   * The type attribute of the Button.
   */
  type: PropTypes.oneOf(BUTTON_TYPES_ARR),
  /**
   * The title attribute of the Button.
   */
  title: PropTypes.string,
  /**
   * If true, shows the Button in a minimal style.
   */
  minimal: PropTypes.bool,
  /**
   * If true, shows the Button in a small style.
   */
  small: PropTypes.bool,
  /**
   * If true, shows the Button in an outline style.
   */
  outline: PropTypes.bool,
}

Button.defaultProps = {
  id: null,
  as: 'button',
  className: null,
  loading: false,
  disabled: false,
  onClick: () => { },
  intent: Intent.NONE,
  type: BUTTON_TYPES.BUTTON,
  minimal: false,
  title: null,
  small: false,
  outline: false,
}

// eslint-disable-next-line react/jsx-props-no-spreading
const DefaultComp = memo(Button)
DefaultComp.displayName = 'Button'

export default DefaultComp
