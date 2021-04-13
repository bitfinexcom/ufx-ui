import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { Notice, NOTICE_TYPES, Input } from '../../../../../components/ui'

const PaymentId = (props) => {
  const {
    currencySymbol: ccy,
    paymentId,
    paymentIdLabel,
  } = props
  const { t } = useTranslation('deposits')

  return (
    <Notice type={NOTICE_TYPES.INFO}>
      {t('warnings.send_paymend_id', { ccy, type: paymentIdLabel })}
      <br />
      <br />
      {t('warnings.send_special_deposit_address', { ccy })}
      :
      <br />
      <Input
        type='text'
        small
        readOnly
        value={paymentId}
      />
    </Notice>
  )
}

PaymentId.propTypes = {
  currencySymbol: PropTypes.string.isRequired,
  paymentId: PropTypes.string,
  paymentIdLabel: PropTypes.string.isRequired,
}

PaymentId.defaultProps = {
  paymentId: null,
}

export default memo(PaymentId)
