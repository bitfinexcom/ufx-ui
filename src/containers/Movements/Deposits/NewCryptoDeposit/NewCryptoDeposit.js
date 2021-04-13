import PropTypes from 'prop-types'
import React, { memo } from 'react'

import * as Classes from '../../../../common/classes'
import { Spinner } from '../../../../components'
import withI18nProvider from '../../../../hoc/withI18nProvider'
import withResponsive from '../../../../hoc/withResponsive'
import NewCryptoDepositChecks from './NewCryptoDepositChecks'
import NewCryptoDepositDetails from './NewCryptoDepositDetails'

const NewCryptoDeposit = ({
  loading,
  currency,
  getCurrencyLabel,
  getCurrencySymbol,
  getCurrencyPool,
  hasPaymentIdForDeposits,
  paymentId,
}) => {
  const currencyLabel = getCurrencyLabel(currency)
  const currencySymbol = getCurrencySymbol(currency)
  const currencyPool = getCurrencyPool(currency)

  if (loading) {
    return <Spinner />
  }

  return (
    <div className={Classes.NEW_CRYPTO_DEPOSIT}>
      <NewCryptoDepositChecks
        currency={currency}
        currencyLabel={currencyLabel}
        currencySymbol={currencySymbol}
        hasPaymentIdForDeposits={hasPaymentIdForDeposits}
      >
        <NewCryptoDepositDetails
          currency={currency}
          currencyLabel={currencyLabel}
          currencySymbol={currencySymbol}
          currencyPool={currencyPool}
          hasPaymentIdForDeposits={hasPaymentIdForDeposits}
          paymentId={paymentId}
        />
      </NewCryptoDepositChecks>
    </div>
  )
}

NewCryptoDeposit.propTypes = {
  loading: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
  getCurrencyLabel: PropTypes.func.isRequired,
  getCurrencySymbol: PropTypes.func.isRequired,
  getCurrencyPool: PropTypes.func.isRequired,
  hasPaymentIdForDeposits: PropTypes.func.isRequired,
  paymentId: PropTypes.string,
}

NewCryptoDeposit.defaultProps = {
  paymentId: null,
}

export default withResponsive(withI18nProvider(memo(NewCryptoDeposit)))
