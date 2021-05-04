import { Input } from '@ufx-ui/core'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

// TODO: add feature to select whitelisted address
// TODO: add address validation
const WithdrawalAddressInput = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation('withdrawals')

  return (
    <>
      <div className='address-label label'>{t('movements:address')}</div>

      <div className='address-input'>
        <Input
          small
          type='text'
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  )
}

WithdrawalAddressInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default memo(WithdrawalAddressInput)
