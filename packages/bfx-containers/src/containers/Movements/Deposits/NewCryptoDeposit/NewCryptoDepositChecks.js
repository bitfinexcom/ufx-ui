import _toUpper from 'lodash/toUpper'
import PropTypes from 'prop-types'
import React, { memo, useState } from 'react'

import { BTC_LIGHTNING_CCY, WALLETS } from '../../constants'
import NewInvoice from './NewInvoice'
import PaymentIdConfirm from './PaymentIdConfirm'

const NewCryptoDepositChecks = ({
  currency,
  currencyLabel,
  currencySymbol,
  hasPaymentIdForDeposits,
  children,
}) => {
  const [shownPaymentIdConfirm, setShownPaymentIdConfirm] = useState(false)

  const hasPaymentId = hasPaymentIdForDeposits(currency)

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
}

export default memo(NewCryptoDepositChecks)
