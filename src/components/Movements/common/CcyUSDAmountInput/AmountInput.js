import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { Input } from '../../../ui'

const AmountInput = ({
  value, onChange, symbol, ...props
}) => (
  <div className='amount-input'>
    <Input
      type='number'
      autoComplete='off'
      name='amount'
      value={value}
      onChange={onChange}
      rightElement={<div className='ccy'>{symbol}</div>}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </div>
)

AmountInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
}

export default memo(AmountInput)
