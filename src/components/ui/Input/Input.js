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
    style,
    readOnly,
    disabled,
    onChange,
    onBlur,
    leftElement,
    rightElement,
    error,
    alignText,
    small,
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
      style={style}
      ref={ref}
      className={cx(Classes.INPUT, className)}
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
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.node,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  leftElement: PropTypes.node,
  rightElement: PropTypes.node,
  error: PropTypes.string,
  alignText: PropTypes.oneOf(Object.values(TEXT_ALIGNMENT)),
  small: PropTypes.bool,
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
  style: null,
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
