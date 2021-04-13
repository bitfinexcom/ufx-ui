import PropTypes from 'prop-types'
import React, { memo } from 'react'

import FormattedValue from '../../components/format/PrettyValue'
import { PLATFORM_SETTINGS } from '../../var/config'

const { AMOUNT_DECIMALS } = PLATFORM_SETTINGS

const OrderHAmount = (props) => {
  const {
    amount,
    originalAmount,
  } = props

  return (amount && originalAmount && originalAmount !== amount ? (
    <>
      <FormattedValue value={amount} decimals={AMOUNT_DECIMALS} fadeTrailingZeros />
      {' '}
      /
      {originalAmount}
    </>
  )
    : <FormattedValue value={amount || originalAmount} decimals={AMOUNT_DECIMALS} fadeTrailingZeros />
  )
}

OrderHAmount.propTypes = {
  amount: PropTypes.number,
  originalAmount: PropTypes.number,
}

OrderHAmount.defaultProps = {
  amount: 0,
  originalAmount: 0,
}

export default memo(OrderHAmount)
