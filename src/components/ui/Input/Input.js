import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'

import * as Classes from '../../../common/classes'
import * as Props from '../../../common/props'
import Label from '../Label'

const { TEXT_ALIGNMENT } = Props

// eslint-disable-next-line prefer-arrow-callback
const Input = forwardRef(function Input(props, ref) {
  const {
    type,
    id,
    name,
    value,
    placeholder,
    label,
    className,
    readOnly,
    disabled,
    onChange,
    onBlur,
    leftElement,
    rightElement,
    error,
    alignText,
    small,
    ...rest
  } = props

  const inputValue = (value === 0 || value)
    ? value
    : ''

  const inputProps = {
    type,
    placeholder,
    readOnly,
    disabled,
    onChange: (e) => onChange(e.target.value, e),
    className: cx(
      'input-field',
      `input-field${Classes.alignmentModifier(alignText)}`, {
        [`input-field${Classes.SIZE_SMALL}`]: small,
      },
    ),
    autoComplete: 'off',
    value: inputValue,
    name,
    id,
    onBlur,
  }

  const isError = !!error

  return (
    <div
      ref={ref}
      className={cx(Classes.INPUT, className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {label && (
        <Label
          label={label}
          small={small}
          tag='div'
        />
      )}

      <div className={cx('input-field-container', { disabled, 'has-error': isError })} disabled={disabled}>
        {leftElement}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...inputProps} />
        {rightElement}
      </div>

      <div className={cx('error-msg', { visible: isError })}>
        {error}
      </div>
    </div>
  )
})

Input.propTypes = {
  /**
   * The type of the Input.
   */
  type: PropTypes.string,
  /**
   * The ID of the Input.
   */
  id: PropTypes.string,
  /**
   * The name of the Input.
   */
  name: PropTypes.string,
  /**
   * The value of the Input.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The placeholder of the Input.
   */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The label of the Input.
   */
  label: PropTypes.node,
  /**
   * The className of the Input.
   */
  className: PropTypes.string,
  /**
   * The readOnly of the Input.
   */
  readOnly: PropTypes.bool,
  /**
   * If true, set the Input to the disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * The function called when the Input changes.
   */
  onChange: PropTypes.func,
  /**
   * The function called when the Input blurs.
   */
  onBlur: PropTypes.func,
  /**
   * The leftElement of the Input.
   */
  leftElement: PropTypes.node,
  /**
   * The rightElement of the Input.
   */
  rightElement: PropTypes.node,
  /**
   * The error text of the Input.
   */
  error: PropTypes.string,
  /**
   * The alignment of the text of the Input.
   */
  alignText: PropTypes.oneOf(Object.values(TEXT_ALIGNMENT)),
  /**
   * If true, shows the Input in a small style.
   */
  small: PropTypes.bool,
  /**
   * If true, shows the error of the Input.
   */
  shouldRenderError: PropTypes.bool,
}

Input.defaultProps = {
  type: 'text',
  id: null,
  name: null,
  value: '',
  placeholder: '',
  label: '',
  className: null,
  readOnly: false,
  disabled: false,
  onChange: () => { },
  onBlur: () => { },
  leftElement: '',
  rightElement: '',
  error: null,
  alignText: TEXT_ALIGNMENT.LEFT,
  small: false,
  shouldRenderError: true,
}

export default Input
