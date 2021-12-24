import { Notice, NOTICE_TYPES } from '@ufx-ui/core'
import _toUpper from 'lodash/toUpper'
import PropTypes from 'prop-types'
import React, { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BTC_LIGHTNING_CCY, WALLETS } from '../../constants'
import NewInvoice from './NewInvoice'
import PaymentIdConfirm from './PaymentIdConfirm'

const NewCryptoDepositChecks = ({
  currency,
  currencyLabel,
  currencySymbol,
  hasPaymentIdForDeposits,
  getIsDepositActive,
  children,
}) => {
  const [shownPaymentIdConfirm, setShownPaymentIdConfirm] = useState(false)

  const hasPaymentId = hasPaymentIdForDeposits(currency)
  const isDepositActive = getIsDepositActive(currency)
  const { t } = useTranslation()

  if (!isDepositActive) {
    return (
      <Notice type={NOTICE_TYPES.WARNING}>
        {t('movements:not_active_or_supported', { currency, type: 'deposits' })}
      </Notice>
    )
  }

  if (hasPaymentId && !shownPaymentIdConfirm) {
    return (
      <PaymentIdConfirm
        currency={currency}
        currencyLabel={currencyLabel}
        setShownPaymentIdConfirm={setShownPaymentIdConfirm}
      />
    )
  }

  const isLNX = _toUpper(currency) === BTC_LIGHTNING_CCY

  return (
    <>
      {isLNX
        ? (
          <NewInvoice
            currency={currency}
            currencySymbol={currencySymbol}
            wallets={WALLETS}
          />
        )
        : children}
    </>
  )
}

NewCryptoDepositChecks.propTypes = {
  currency: PropTypes.string.isRequired,
  currencyLabel: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  hasPaymentIdForDeposits: PropTypes.func.isRequired,
  getIsDepositActive: PropTypes.func.isRequired,
}

export default memo(NewCryptoDepositChecks)
