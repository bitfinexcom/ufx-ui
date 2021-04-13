import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useRef, forwardRef } from 'react'

import * as Classes from '../../../common/classes'
import * as utils from '../../../common/utils'
import Label from '../Label'

const stopPropagationOnClick = (e) => e.stopPropagation()

// eslint-disable-next-line prefer-arrow-callback
const Checkbox = forwardRef(function Checkbox(props, ref) {
  const {
    label,
    checked,
    disabled,
    className,
    style,
    id,
    name,
    onChange,
    error,
    small,
  } = props
  const checkboxRef = useRef(null)
  const classes = cx(Classes.CHECKBOX, className, {
    disabled,
    checked,
    [Classes.CHECKBOX + Classes.SIZE_SMALL]: small,
  })

  const handleCheckboxChange = (e) => {
    onChange(e.target.checked, e)
  }

  const handleLabelClick = (e) => {
    // use DOM input click to trigger checkbox change event, so it triggers an actual Input Change event, rather than label onClick
    e.stopPropagation()
    checkboxRef.current.click()
  }

  const inputProps = {
    id,
    name,
    checked,
    value: checked,
    type: 'checkbox',
    disabled,
    className: cx('input-field', {
      checked,
    }),
    onClick: stopPropagationOnClick,
    onChange: handleCheckboxChange,
    ref: checkboxRef,
  }

  return (
    <div
      style={style}
      ref={ref}
      className={classes}
      htmlFor={id}
      tabIndex={disabled ? -1 : 0}
      role='checkbox'
      aria-checked={checked}
      onClick={handleLabelClick}
      onKeyPress={utils.handleKeyboardEvent(' ', handleLabelClick)}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input {...inputProps} />

      <Label
        label={label || ''}
        className={cx({ disabled })}
        tag='div'
        small={small}
      />

      {error && (
        <div className='error'>
          {error}
        </div>
      )}
    </div>
  )
})

Checkbox.propTypes = {
  label: PropTypes.node,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  small: PropTypes.bool,
}

Checkbox.defaultProps = {
  label: '',
  disabled: false,
  className: null,
  style: null,
  id: null,
  name: null,
  onChange: () => { },
  error: '',
  small: false,
}

export default Checkbox
