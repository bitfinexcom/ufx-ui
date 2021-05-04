/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { Input as UIInput } from '../ui'

const Input = (props) => {
  const {
    field: {
      name, value, onBlur, onChange,
    },
    form: { touched, errors },
    fieldsToValidate,
    ...rest
  } = props
  let error = (touched[name] && errors[name])
  if (!error && fieldsToValidate) {
    const errorField = fieldsToValidate.find(f => touched[f])
    error = errorField && errors[errorField]
  }

  const errorMessage = error || ''

  const handleChange = (_, e) => {
    onChange(e)
  }

  return (
    <UIInput
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={handleChange}
      error={errorMessage}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
}

Input.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
}

export default memo(Input)
