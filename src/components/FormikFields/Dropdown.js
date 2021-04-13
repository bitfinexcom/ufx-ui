/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { Dropdown as UIDropdown } from '../ui'

const Dropdown = (props) => {
  const {
    field: {
      name, value, onChange,
    },
    ...rest
  } = props

  const handleOnChange = (val) => {
    // need to mimic a standard js event for Formik to pick this up
    const e = {
      target: {
        value: val,
        name,
      },
    }

    onChange(e)
  }

  return (
    <UIDropdown
      name={name}
      value={value}
      onChange={handleOnChange}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
}

Dropdown.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
}

export default memo(Dropdown)
