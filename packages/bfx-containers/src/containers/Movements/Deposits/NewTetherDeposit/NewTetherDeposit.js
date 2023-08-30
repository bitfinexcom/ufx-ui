import {
  Classes, Spinner, Notice, NOTICE_TYPES,
} from '@ufx-ui/core'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import NewTetherDepositDetails from './NewTetherDepositDetails'
import symbol from '../../../../api/symbol'
import withI18nProvider from '../../../../hoc/withI18nProvider'

const NewTetherDeposit = ({
  loading,
  currency,
  tetherProtocols,
  hasPaymentIdForDeposits,
  getIsDepositActive,
  getCurrencySymbol,
}) => {
  const isDepositActive = getIsDepositActive(currency)
  const { t } = useTranslation()

  if (loading) {
    return <Spinner />
  }

  if (!isDepositActive) {
    return (
      <Notice type={NOTICE_TYPES.WARNING}>
        {t('movements:not_active_or_supported', { currency, type: 'deposits' })}
      </Notice>
    )
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
  getIsDepositActive: PropTypes.func.isRequired,
}

export default withI18nProvider(memo(NewTetherDeposit))
