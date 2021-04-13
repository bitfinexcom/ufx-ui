import React, { memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { DepositWallets } from '../../../../../components'
import { notifyError } from '../../../../../redux/actions/notifications.actions'
import { getCurrencyTxMethod as getCurrencyTxMethodSelector } from '../../../../../redux/selectors/currencies.selectors'
import { getUIWalletNames } from '../../../../../redux/selectors/UI.selectors'
import useDepositWallets from '../../../useDepositWallets'
import { requestWalletAddress as requestAddress } from '../../helpers'

const DepositWalletsContainer = (props) => {
  const { currency, isTether } = props
  const getCurrencyTxMethod = useSelector(getCurrencyTxMethodSelector)
  const dispatch = useDispatch()
  const wallets = useDepositWallets(currency, isTether ? currency : null)

  const requestWalletAddress = useCallback(
    ({
      name, address, setAddress,
    }) => {
      requestAddress({
        name,
        address,
        setAddress,
        notifyError: (message) => dispatch(notifyError(message)),
        currency: getCurrencyTxMethod(currency),
      })
    },
    [currency, dispatch, getCurrencyTxMethod],
  )

  return (
    <DepositWallets
      walletNames={useSelector(getUIWalletNames)}
      requestWalletAddress={requestWalletAddress}
      wallets={wallets}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default memo(DepositWalletsContainer)
