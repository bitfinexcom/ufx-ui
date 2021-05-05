import { Notice, NOTICE_TYPES } from '@ufx-ui/core'
import _get from 'lodash/get'
import _toLower from 'lodash/toLower'
import PropTypes from 'prop-types'
import React, { memo, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ERC20_WARN_CCYS } from '../../constants'
import { WALLET_PROPS } from '../../Movements.props'
import NewCryptoTetherWithdrawal from '../NewCryptoTetherWithdrawal'
import useNewWithdrawalForm from '../useNewWithdrawalForm'

const NewCryptoWithdrawalDetails = ({
  currency,
  wallets,
  hasPaymentIdForWithdrawals,
  getCurrencyLabel,
  getCurrencySymbol,
  getCurrencyTxMethod,
  requestNewWithdraw,
}) => {
  const { t } = useTranslation('withdrawals')

  const currencyLabel = getCurrencyLabel(currency)
  const hasPaymentId = hasPaymentIdForWithdrawals(currency)

  const formProps = useNewWithdrawalForm(hasPaymentId)
  const { setFormField, formState } = formProps

  const handleSubmit = useCallback(() => {
    const requestData = {
      ...formState,
      method: _toLower(getCurrencyTxMethod(currency)),
    }
    requestNewWithdraw(requestData)
  }, [currency, formState, getCurrencyTxMethod, requestNewWithdraw])

  useEffect(() => {
    // sets initial wallet select value
    setFormField('wallet', _get(wallets, '0.name', ''))
  }, [setFormField, wallets])

  return (
    <>
      {ERC20_WARN_CCYS.includes(currency) && (
        <Notice type={NOTICE_TYPES.WARNING}>
          {t('warnings.erc20_only', { currency, label: currencyLabel })}
        </Notice>
      )}

      <NewCryptoTetherWithdrawal
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...formProps}
        currency={currency}
        wallets={wallets}
        handleSubmit={handleSubmit}
        hasPaymentId={hasPaymentId}
        getCurrencyLabel={getCurrencyLabel}
        getCurrencySymbol={getCurrencySymbol}
      />
    </>
  )
}

NewCryptoWithdrawalDetails.propTypes = {
  currency: PropTypes.string.isRequired,
  wallets: WALLET_PROPS,
  getCurrencyLabel: PropTypes.func.isRequired,
  getCurrencySymbol: PropTypes.func.isRequired,
  hasPaymentIdForWithdrawals: PropTypes.func.isRequired,
}

NewCryptoWithdrawalDetails.defaultProps = {
  wallets: [],
}

export default memo(NewCryptoWithdrawalDetails)
