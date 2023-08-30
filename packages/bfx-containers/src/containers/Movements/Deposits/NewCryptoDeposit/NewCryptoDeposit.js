import { Classes, withResponsive, Spinner } from '@ufx-ui/core'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import NewCryptoDepositChecks from './NewCryptoDepositChecks'
import NewCryptoDepositDetails from './NewCryptoDepositDetails'
import withI18nProvider from '../../../../hoc/withI18nProvider'

const NewCryptoDeposit = ({
  loading,
  currency,
  getCurrencyLabel,
  getCurrencySymbol,
  getCurrencyPool,
  hasPaymentIdForDeposits,
  paymentId,
  getIsDepositActive,
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
        getIsDepositActive={getIsDepositActive}
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
  getIsDepositActive: PropTypes.func.isRequired,
}

NewCryptoDeposit.defaultProps = {
  paymentId: null,
}

export default withResponsive(withI18nProvider(memo(NewCryptoDeposit)))
