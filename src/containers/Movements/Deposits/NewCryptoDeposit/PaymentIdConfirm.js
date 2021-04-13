import _startCase from 'lodash/startCase'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../../../common/classes'
import Intent from '../../../../common/intent'
import {
  Button, ExternalLink, Notice, NOTICE_TYPES,
} from '../../../../components/ui'
import { getPaymentIdLabel } from '../../../../utils/movements'
import { BFX_URL } from '../../../../var/config'

const PaymentIdConfirm = (props) => {
  const {
    currency,
    currencyLabel: term,
    setShownPaymentIdConfirm,
  } = props
  const { t } = useTranslation('deposits')

  const confirmUnderstanding = () => {
    setShownPaymentIdConfirm(true)
  }
  const paymentIdLabel = getPaymentIdLabel(currency)

  return (
    <>
      <Notice type={NOTICE_TYPES.ERROR}>
        {t('warnings.payment_id_extra1', { term })}
      </Notice>

      <p>
        {t('warnings.payment_id_extra2', { term, field: paymentIdLabel })}
      </p>

      <p>
        {t('warnings.payment_id_extra3', { term })}:
      </p>

      <ol>
        <li>{t('movements:address')}</li>
        <li>{_startCase(paymentIdLabel)}</li>
      </ol>

      <p>
        {t('warnings.payment_id_extra4', { field: paymentIdLabel })}
        {' '}
        {t('warnings.payment_id_extra5', { field: paymentIdLabel })}
      </p>

      <p>
        {t('warnings.payment_id_extra6', { term, field: paymentIdLabel })}
        {' '}
        {t('warnings.payment_id_extra7', { field: paymentIdLabel })}
      </p>

      <p>
        {t('contact_support_1')}
        <ExternalLink link={`${BFX_URL}/support`}>
          {t('contact_support_link')}
        </ExternalLink>
        {t('contact_support_2')}
      </p>

      <div className={Classes.DIVIDER} />

      <Button
        small
        intent={Intent.SUCCESS}
        onClick={confirmUnderstanding}
      >
        {t('understand')}
      </Button>
    </>
  )
}

PaymentIdConfirm.propTypes = {
  currency: PropTypes.string.isRequired,
  currencyLabel: PropTypes.string.isRequired,
  setShownPaymentIdConfirm: PropTypes.func.isRequired,
}

export default memo(PaymentIdConfirm)
