import { Dropdown } from '@ufx-ui/core'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

const CurrencyList = (props) => {
  const {
    value, onChange, currencies, className,
  } = props

  return (
    <Dropdown
      small
      searchable
      className={className}
      value={value}
      onChange={onChange}
      options={currencies}
    />
  )
}

CurrencyList.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string.isRequired,
}

export default memo(CurrencyList)
