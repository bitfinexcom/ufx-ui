import { PrettyValue } from '@ufx-ui/core'
import { PLATFORM_SETTINGS } from '@ufx-ui/utils'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

const { AMOUNT_DECIMALS } = PLATFORM_SETTINGS

const OrderHAmount = (props) => {
  const {
    amount,
    originalAmount,
  } = props

  return (amount && originalAmount && originalAmount !== amount ? (
    <>
      <PrettyValue value={amount} decimals={AMOUNT_DECIMALS} fadeTrailingZeros />
      {' '}
      /
      {originalAmount}
    </>
  )
    : <PrettyValue value={amount || originalAmount} decimals={AMOUNT_DECIMALS} fadeTrailingZeros />
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
