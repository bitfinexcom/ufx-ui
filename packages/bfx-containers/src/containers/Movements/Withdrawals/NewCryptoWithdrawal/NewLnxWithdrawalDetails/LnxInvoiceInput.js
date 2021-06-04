import { Input, useDebounce } from '@ufx-ui/core'
import _size from 'lodash/size'
import PropTypes from 'prop-types'
import React, { useEffect, useState, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { decodePaymentRequest } from './helpers'

const EXPECTED_LNX_NETWORK = 'bc'
const CHECK_INVOICE_DEBOUNCE = 200 // 0.2s

const LnxInvoiceInput = (props) => {
  const {
    value,
    onChange,
    setIsInvoiceValid,
    minLnx,
    maxLnx,
  } = props
  const { t } = useTranslation('withdrawals')

  const [error, setError] = useState('')
  const debouncedInvoice = useDebounce(value, CHECK_INVOICE_DEBOUNCE)

  useEffect(() => {
    if (!_size(debouncedInvoice)) {
      setIsInvoiceValid(false)
      setError('')
      return
    }
    const { error: err, network, amount = 0 } = decodePaymentRequest(debouncedInvoice)
    if (_size(err)) {
      setIsInvoiceValid(false)
      setError(t(err))
      return
    }
    if (network !== EXPECTED_LNX_NETWORK) {
      setIsInvoiceValid(false)
      setError(t('invalid_payment_network'))
    }

    if (amount < minLnx || amount > maxLnx) {
      setIsInvoiceValid(false)
      setError(t('movements:errors.invalid_invoice_amount', {
        min: minLnx,
        max: maxLnx,
      }))
      return
    }
    setIsInvoiceValid(true)
    setError('')
  }, [debouncedInvoice, maxLnx, minLnx, setIsInvoiceValid, t])

  return (
    <>
      <div className='label'>{t('invoice')}</div>
      <div className='address-input'>
        <Input
          small
          type='text'
          name='amount'
          value={value}
          onChange={onChange}
          error={error}
        />
      </div>
    </>
  )
}

LnxInvoiceInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  setIsInvoiceValid: PropTypes.func.isRequired,
  minLnx: PropTypes.number.isRequired,
  maxLnx: PropTypes.number.isRequired,
}

export default memo(LnxInvoiceInput)
