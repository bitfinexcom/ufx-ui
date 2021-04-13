import _toUpper from 'lodash/toUpper'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { defaultBaseCcy } from '../../../../functions/config.selectors'
import {
  getCurrencyTxMethod as getCurrencyTxMethodSelector,
  getHasPaymentIdForDeposits,
  getCurrencyLabel,
  getCurrencySymbolMemo,
  getCurrencyPool,
} from '../../../../redux/selectors/currencies.selectors'
import { getPoolAddress } from '../../../../redux/selectors/movements.selectors'
import { getWSIsAuthenticated } from '../../../../redux/selectors/ws.selectors'
import NewCryptoDeposit from './NewCryptoDeposit'

const NewCryptoDepositContainer = (props) => {
  const { baseCcy } = props
  const currency = _toUpper(baseCcy)

  const isAuthenticated = useSelector(getWSIsAuthenticated)
  const getCurrencyTxMethod = useSelector(getCurrencyTxMethodSelector)
  const txMethod = getCurrencyTxMethod(currency, null)
  const loading = !isAuthenticated && !!txMethod
  const paymentId = useSelector(state => getPoolAddress(state, currency))

  return (
    <NewCryptoDeposit
      currency={currency}
      loading={loading}
      paymentId={paymentId}
      hasPaymentIdForDeposits={useSelector(getHasPaymentIdForDeposits)}
      getCurrencyLabel={useSelector(getCurrencyLabel)}
      getCurrencySymbol={useSelector(getCurrencySymbolMemo)}
      getCurrencyPool={useSelector(getCurrencyPool)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

NewCryptoDepositContainer.propTypes = {
  baseCcy: PropTypes.string,
}

NewCryptoDepositContainer.defaultProps = {
  baseCcy: defaultBaseCcy,
}

export default memo(NewCryptoDepositContainer)
