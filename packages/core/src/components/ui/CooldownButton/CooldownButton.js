import { faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, {
  useEffect, useState, useRef, forwardRef, memo,
} from 'react'

import Button from '../Button'

// eslint-disable-next-line prefer-arrow-callback
export const CooldownButton = forwardRef(function CooldownButton(props, ref) {
  const {
    timeoutMs, disabled: propDisabled, onClick, ...rest
  } = props

  const [disabled, setDisabled] = useState(false)

  const cancelTimeout = useRef()

  useEffect(
    () => () => {
      if (cancelTimeout.current) {
        clearTimeout(cancelTimeout.current)
      }
    },
    [cancelTimeout],
  )

  const handleClick = (e) => {
    setDisabled(true)
    cancelTimeout.current = setTimeout(() => setDisabled(false), timeoutMs)
    onClick(e)
  }

  return (
    <Button
      ref={ref}
      disabled={propDisabled || disabled}
      onClick={handleClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
})

CooldownButton.propTypes = {
  /**
   * The function called when the CooldownButton is clicked.
   */
  onClick: PropTypes.func,
  /**
   * The cooldown timeout in milliseconds.
   */
  timeoutMs: PropTypes.number,
  /**
   * If true, set the button to the disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * The element, which is displayed as button.
   */
  children: PropTypes.node,
}

CooldownButton.defaultProps = {
  onClick: () => {},
  timeoutMs: 1000,
  disabled: false,
  children: <FontAwesomeIcon icon={faSync} />,
}

export default memo(CooldownButton)
