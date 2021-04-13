import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { Checkbox, Input } from '../../../../../components/ui'
import HelpButton from '../../../common/HelpButton'
import { XRP } from '../../../constants'

const WithdrawalPaymentIdInput = ({
  currency,
  label,
  value,
  onChange,
  isNoPaymentIdChecked,
  onNoPaymentIdChange,
  currencyLabel,
  disabled,
}) => {
  const { t } = useTranslation('withdrawals')

  return (
    <>
      <div className='memo-label label'>{label}</div>
      <div className='memo-input'>
        <Input
          small
          type={currency === XRP ? 'number' : 'text'}
          value={value}
          onChange={onChange}
          disabled={disabled || isNoPaymentIdChecked}
        />

        <Checkbox
          small
          checked={isNoPaymentIdChecked}
          onChange={onNoPaymentIdChange}
          disabled={disabled}
          label={(
            <span>
              {t('common:no')}
              {' '}
              {label}
              {' '}
              <HelpButton
                helpMessage={(
                  <>
                    {t('no_payment_id_info_1', {
                      type: label,
                      ccy: currencyLabel,
                    })}
                    <br />
                    <br />
                    {t('no_payment_id_info_2')}
                    <strong>{t('no_payment_id_info_3')}</strong>
                    {t('no_payment_id_info_4', {
                      type: label,
                    })}
                  </>
                )}
              >{t('whats_this')}
              </HelpButton>
            </span>
        )}
        />
      </div>
    </>
  )
}

WithdrawalPaymentIdInput.propTypes = {
  currency: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isNoPaymentIdChecked: PropTypes.bool.isRequired,
  onNoPaymentIdChange: PropTypes.func.isRequired,
  currencyLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

WithdrawalPaymentIdInput.defaultProps = {
  currency: null,
  value: null,
  disabled: false,
}

export default memo(WithdrawalPaymentIdInput)
