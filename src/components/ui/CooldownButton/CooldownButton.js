import PropTypes from 'prop-types'
import React, {
  useEffect, useState, memo, useRef, forwardRef,
} from 'react'

import Button from '../Button'

// eslint-disable-next-line prefer-arrow-callback
const CooldownButton = forwardRef(function CooldownButton(props, ref) {
  const {
    timeoutMs,
    disabled: propDisabled,
    onClick,
    ...rest
  } = props

  const [disabled, setDisabled] = useState(false)

  const cancelTimeout = useRef()

  useEffect(() => () => {
    if (cancelTimeout.current) {
      clearTimeout(cancelTimeout.current)
    }
  }, [cancelTimeout])

  const handleClick = (e) => {
    setDisabled(true)
    cancelTimeout.current = setTimeout(
      () => setDisabled(false),
      timeoutMs,
    )
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
}

CooldownButton.defaultProps = {
  onClick: () => {},
  timeoutMs: 1000,
}

export default memo(CooldownButton)
