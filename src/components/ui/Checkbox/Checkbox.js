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
    id,
    name,
    onChange,
    error,
    small,
    ...rest
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
      ref={ref}
      className={classes}
      htmlFor={id}
      tabIndex={disabled ? -1 : 0}
      role='checkbox'
      aria-checked={checked}
      onClick={handleLabelClick}
      onKeyPress={utils.handleKeyboardEvent(' ', handleLabelClick)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
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
  /**
   * The label text of the Checkbox.
   */
  label: PropTypes.node,
  /**
   * If true, set the Checkbox to the checked state.
   */
  checked: PropTypes.bool.isRequired,
  /**
   * If true, set the Checkbox to the disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * The className of the Button.
   */
  className: PropTypes.string,
  /**
   * The ID of the Button.
   */
  id: PropTypes.string,
  /**
   * The name attribute of the Button.
   */
  name: PropTypes.string,
  /**
   * The function called when the Checkbox state changes.
   */
  onChange: PropTypes.func,
  /**
   * The error text of the Checkbox.
   */
  error: PropTypes.string,
  /**
   * If true, shows the Button in a small style.
   */
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
