import {
  Classes, withResponsive, Spinner,
} from '@ufx-ui/core'
import cx from 'classnames'
import _toUpper from 'lodash/toUpper'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import withI18nProvider from '../../../../hoc/withI18nProvider'
import { BTC_LIGHTNING_CCY, WALLETS } from '../../constants'
import NewCryptoWithdrawalDetails from './NewCryptoWithdrawalDetails'
import NewLnxWithdrawalDetails from './NewLnxWithdrawalDetails'

const NewCryptoWithdrawal = ({
  loading,
  currency,
  getCurrencyLabel,
  getCurrencySymbol,
  getCurrencyTxMethod,
  requestNewWithdraw,
  hasPaymentIdForWithdrawals,
}) => {
  const isLNX = _toUpper(currency) === BTC_LIGHTNING_CCY

  const Details = isLNX ? NewLnxWithdrawalDetails : NewCryptoWithdrawalDetails

  if (loading) {
    return <Spinner />
  }

  return (
    <div className={cx(Classes.NEW_WITHDRAWAL, { lnx: isLNX })}>
      <Details
        currency={currency}
        hasPaymentIdForWithdrawals={hasPaymentIdForWithdrawals}
        getCurrencyLabel={getCurrencyLabel}
        getCurrencySymbol={getCurrencySymbol}
        getCurrencyTxMethod={getCurrencyTxMethod}
        requestNewWithdraw={requestNewWithdraw}
        wallets={WALLETS}
      />
    </div>
  )
}

NewCryptoWithdrawal.propTypes = {
  hasPaymentIdForWithdrawals: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  getCurrencyLabel: PropTypes.func.isRequired,
  getCurrencySymbol: PropTypes.func.isRequired,
  getCurrencyTxMethod: PropTypes.func.isRequired,
  requestNewWithdraw: PropTypes.func.isRequired,
}

export default withResponsive(withI18nProvider(memo(NewCryptoWithdrawal)))
