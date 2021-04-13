import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { formatNumber } from '../../../../../functions/number'

const trailingZerosRegExp = new RegExp('(0+)$')

const PrettyBalance = ({ balance }) => {
  const formatted = formatNumber({ number: balance, decimals: 8 })
  const { index = formatted.length } = trailingZerosRegExp.exec(formatted) || {}
  const balanceNumbers = formatted.substr(0, index)
  const trailingZeros = formatted.substr(index)

  return (
    <>
      {balanceNumbers}
      <span className='trailing-zeros'>
        {trailingZeros}
      </span>
    </>
  )
}

PrettyBalance.propTypes = {
  balance: PropTypes.number.isRequired,
}

export default memo(PrettyBalance)
