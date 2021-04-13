/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { Checkbox as UICheckbox } from '../ui'

const Checkbox = (props) => {
  const {
    field: {
      name, value, onChange,
    },
    form: { touched, errors },
    ...rest
  } = props
  const error = (touched[name] && errors[name])

  const handleChange = (checked, e) => {
    onChange(e)
  }

  return (
    <UICheckbox
      name={name}
      checked={value}
      error={error}
      onChange={handleChange}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
}

Checkbox.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
}

export default memo(Checkbox)
