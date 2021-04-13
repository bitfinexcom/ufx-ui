import { faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { IOTA } from '../../constants'
import { depositAddressTerm } from '../helpers'

const DepositInstructions = (props) => {
  const {
    currency,
    currencyPool,
    currencyLabel,
    hasPaymentId,
    paymentIdLabel,
  } = props
  const { t } = useTranslation('deposits')

  return (
    <>
      <div>
        {t('send_to1', {
          currency: currencyLabel,
          name: depositAddressTerm(currency, currencyPool),
        })}
        {' '}
        {t('send_to2')}
      </div>
      <div>
        {hasPaymentId && (
        <>
          {t('deposit_add_change_payid_1', {
            type: paymentIdLabel,
          })}
          <FontAwesomeIcon icon={faSync} />
          {t('deposit_add_change_payid_2', {
            type: paymentIdLabel,
          })}
        </>
        )}
        {!hasPaymentId && (
        <>
          <span>
            {t('warnings.deposit_add_change_1')}
            <FontAwesomeIcon icon={faSync} size='sm' />
            {t('warnings.deposit_add_change_2')}
          </span>
          {currency !== IOTA && (
            <>
              {' '}
              {t('warnings.deposit_add_change2')}
            </>
          )}
        </>
        )}
      </div>
    </>
  )
}

DepositInstructions.propTypes = {
  currency: PropTypes.string.isRequired,
  currencyPool: PropTypes.string.isRequired,
  currencyLabel: PropTypes.string.isRequired,
  hasPaymentId: PropTypes.bool.isRequired,
  paymentIdLabel: PropTypes.string.isRequired,
}

export default memo(DepositInstructions)
