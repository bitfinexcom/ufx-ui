import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { getBalancesWallets } from '../../../../../redux/selectors/balances.selectors'
import AvailableBalanceBox from './AvailableBalanceBox'

const AvailableBalanceBoxContainer = (props) => {
  const balances = useSelector(getBalancesWallets)

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AvailableBalanceBox balances={balances} {...props} />
  )
}

export default memo(AvailableBalanceBoxContainer)
