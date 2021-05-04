import { Classes, Spinner } from '@ufx-ui/core'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import symbol from '../../../../api/symbol'
import withI18nProvider from '../../../../hoc/withI18nProvider'
import NewTetherDepositDetails from './NewTetherDepositDetails'

const NewTetherDeposit = ({
  loading,
  currency,
  tetherProtocols,
  hasPaymentIdForDeposits,
  getCurrencySymbol,
}) => {
  if (loading) {
    return <Spinner />
  }

  const currencySymbol = getCurrencySymbol(symbol)

  return (
    <div className={Classes.NEW_TETHER_DEPOSIT}>
      <NewTetherDepositDetails
        currency={currency}
        tetherProtocols={tetherProtocols}
        hasPaymentIdForDeposits={hasPaymentIdForDeposits}
        currencySymbol={currencySymbol}
      />
    </div>
  )
}

NewTetherDeposit.propTypes = {
  currency: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  getCurrencySymbol: PropTypes.func.isRequired,
  hasPaymentIdForDeposits: PropTypes.func.isRequired,
}

export default withI18nProvider(memo(NewTetherDeposit))
