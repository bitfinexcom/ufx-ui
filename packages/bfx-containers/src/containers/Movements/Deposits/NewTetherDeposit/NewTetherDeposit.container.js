import { defaultBaseCcy } from '@ufx-ui/utils'
import _toUpper from 'lodash/toUpper'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import {
  getHasPaymentIdForDeposits,
  getCurrencyLabel,
  getCurrencySymbolMemo,
  getTetherProtocolToCcyMapping,
  getCurrencyTxMethod as getCurrencyTxMethodSelector,
} from '../../../../redux/selectors/currencies.selectors'
import { getWSIsAuthenticated } from '../../../../redux/selectors/ws.selectors'
import { getTetherProtocols } from '../../Tether.helpers'
import NewTetherDeposit from './NewTetherDeposit'

const NewTetherDepositContainer = (props) => {
  const { baseCcy } = props
  const currency = _toUpper(baseCcy)

  const isAuthenticated = useSelector(getWSIsAuthenticated)
  const getCurrencyTxMethod = useSelector(getCurrencyTxMethodSelector)
  const txMethod = getCurrencyTxMethod(currency, null)
  const loading = !isAuthenticated && !!txMethod

  const tetherProtocolCcyMapping = useSelector(getTetherProtocolToCcyMapping)
  const tetherProtocols = getTetherProtocols(tetherProtocolCcyMapping, currency)

  return (
    <NewTetherDeposit
      currency={currency}
      loading={loading}
      tetherProtocols={tetherProtocols}
      hasPaymentIdForDeposits={useSelector(getHasPaymentIdForDeposits)}
      getCurrencyLabel={useSelector(getCurrencyLabel)}
      getCurrencySymbol={useSelector(getCurrencySymbolMemo)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

NewTetherDepositContainer.propTypes = {
  baseCcy: PropTypes.string,
}

NewTetherDepositContainer.defaultProps = {
  baseCcy: defaultBaseCcy,
}

export default memo(NewTetherDepositContainer)
