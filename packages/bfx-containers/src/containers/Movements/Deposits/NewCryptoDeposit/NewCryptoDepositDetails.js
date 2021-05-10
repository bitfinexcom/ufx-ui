import _startCase from 'lodash/startCase'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { getPaymentIdLabel } from '../../../../utils/movements'
import DepositWallets from '../common/DepositWallets'
import DepositInstructions from './DepositInstructions'
import DepositInstructionsForCcy from './DepositInstructionsForCcy'

const NewCryptoDepositDetails = ({
  currency,
  currencyLabel,
  currencySymbol,
  currencyPool,
  hasPaymentIdForDeposits,
  paymentId,
}) => {
  const { t } = useTranslation('deposits')

  const hasPaymentId = hasPaymentIdForDeposits(currency)
  const paymentIdLabel = hasPaymentId ? getPaymentIdLabel(currency) : ''

  return (
    <>
      <DepositInstructionsForCcy
        currency={currency}
        currencyLabel={currencyLabel}
        currencySymbol={currencySymbol}
        hasPaymentId={hasPaymentId}
        paymentIdLabel={paymentIdLabel}
        paymentId={paymentId}
      />

      <div className='crypto-deposit-table'>

        <DepositInstructions
          currency={currency}
          currencyPool={currencyPool}
          currencyLabel={currencyLabel}
          hasPaymentId={hasPaymentId}
          paymentIdLabel={paymentIdLabel}
        />

        <DepositWallets
          currency={currency}
          errorMessage={t('daemon_down', { currency: _startCase(currency) })}
        />
      </div>
    </>
  )
}

NewCryptoDepositDetails.propTypes = {
  currency: PropTypes.string.isRequired,
  currencyLabel: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  currencyPool: PropTypes.string.isRequired,
  hasPaymentIdForDeposits: PropTypes.func.isRequired,
  paymentId: PropTypes.string,
}

NewCryptoDepositDetails.defaultProps = {
  paymentId: null,
}

export default memo(NewCryptoDepositDetails)
