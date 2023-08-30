import { precision } from '@ufx-ui/utils'
import _isNaN from 'lodash/isNaN'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import Tooltip from './Balances.Tooltip'
import { PrettyValue } from '../../format'

const DECIMALS = 2

const BalancesAmount = (props) => {
  const { total, available } = props

  return (
    <Tooltip total={total} available={available}>
      <div className='balance'>
        <span className='total'>
          <PrettyValue
            value={precision(total, DECIMALS)}
            decimals={!_isNaN(total) && total !== 0 ? DECIMALS : 0}
            fadeTrailingZeros
          />
        </span>
        <PrettyValue
          value={precision(available, DECIMALS)}
          decimals={!_isNaN(available) && available !== 0 ? DECIMALS : 0}
          fadeTrailingZeros
        />
      </div>
    </Tooltip>
  )
}

BalancesAmount.propTypes = {
  total: PropTypes.number.isRequired,
  available: PropTypes.number.isRequired,
}

export default memo(BalancesAmount)
