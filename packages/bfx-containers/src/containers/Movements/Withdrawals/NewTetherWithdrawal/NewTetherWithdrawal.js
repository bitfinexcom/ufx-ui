import {
  Classes, Notice, NOTICE_TYPES, withResponsive,
} from '@ufx-ui/core'
import _find from 'lodash/find'
import _get from 'lodash/get'
import _size from 'lodash/size'
import PropTypes from 'prop-types'
import React, {
  useState,
  useCallback,
  useEffect,
  memo,
} from 'react'
import { useTranslation } from 'react-i18next'

import withI18nProvider from '../../../../hoc/withI18nProvider'
import { TetherInfoNotice } from '../../common'
import { WALLETS } from '../../constants'
import NewCryptoTetherWithdrawal from '../NewCryptoTetherWithdrawal'
import useNewWithdrawalForm from '../useNewWithdrawalForm'

const NewTetherWithdrawal = ({
  tetherProtocols,
  hasPaymentIdForWithdrawals,
  getIsWithdrawalActive,
  currency,
  getCurrencySymbol,
  getCurrencyLabel,
  requestNewWithdraw,
}) => {
  const { t } = useTranslation('withdrawals')

  const [formErrors, setFormErrors] = useState({})

  const formProps = useNewWithdrawalForm()
  const {
    formState, setFormField, isSubmitEnabled, setIsNoPaymentIdChecked,
  } = formProps

  const selectedProtocol = _find(tetherProtocols, { method: formState.method }) || {}
  const { transport_ccy: transportCurrency } = selectedProtocol
  const hasPaymentId = hasPaymentIdForWithdrawals(transportCurrency)

  const isSubmitEnabledTether = isSubmitEnabled && _size(formState.method) > 0

  const setFormFieldTether = useCallback((field, value) => {
    setFormField(field, value)
    setFormErrors({
      ...formErrors,
      [field]: '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTetherProtocolChange = useCallback(
    (tetherProtocol) => {
      if (!tetherProtocol) {
        return
      }
      setFormField('method', tetherProtocol)

      setIsNoPaymentIdChecked(false)
      setFormField('payment_id', '')
    },
    [setFormField, setIsNoPaymentIdChecked],
  )

  useEffect(() => {
    // set initial protocol selected
    const tetherProtocol = _get(tetherProtocols, '0.method', '')
    handleTetherProtocolChange(tetherProtocol)
  }, [handleTetherProtocolChange, tetherProtocols])

  const handleSubmit = useCallback(() => {
    requestNewWithdraw(formState)
  }, [formState, requestNewWithdraw])

  useEffect(() => {
    // sets initial wallet select value
    setFormField('wallet', _get(WALLETS, '0.name', ''))
  }, [setFormField])

  const isWithdrawalActive = getIsWithdrawalActive(currency)

  if (!isWithdrawalActive) {
    return (
      <Notice type={NOTICE_TYPES.WARNING}>
        {t('movements:not_active_or_supported', { currency, type: 'withdrawals' })}
      </Notice>
    )
  }

  return (
    <div className={`${Classes.NEW_WITHDRAWAL} tether`}>
      <h2>
        <strong>{t('tether_what')}</strong>
      </h2>

      <TetherInfoNotice currency={currency} />
      <br />

      <Notice type={NOTICE_TYPES.ERROR} title={t('important')}>
        {t('tether_warning1')}
        {t('tether_enabled')}
        {' '}
        {t('tether_warning2')}
      </Notice>

      <NewCryptoTetherWithdrawal
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...formProps}
        isSubmitEnabled={isSubmitEnabledTether}
        setFormField={setFormFieldTether}
        wallets={WALLETS}
        handleSubmit={handleSubmit}
        currency={currency}
        getCurrencyLabel={getCurrencyLabel}
        getCurrencySymbol={getCurrencySymbol}
        hasPaymentId={hasPaymentId}
        isTether
        tetherProtocols={tetherProtocols}
        handleTetherProtocolChange={handleTetherProtocolChange}
      />
    </div>
  )
}

NewTetherWithdrawal.propTypes = {
  currency: PropTypes.string.isRequired,
  getCurrencyLabel: PropTypes.func.isRequired,
  getCurrencySymbol: PropTypes.func.isRequired,
  requestNewWithdraw: PropTypes.func.isRequired,
  hasPaymentIdForWithdrawals: PropTypes.func.isRequired,
  getIsWithdrawalActive: PropTypes.func.isRequired,
}

export default withI18nProvider(withResponsive(memo(NewTetherWithdrawal)))
