import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import Intent from '../../../common/intent'
import { Button } from '../../../components'
import AvailableBalanceBox from './common/AvailableBalanceBox'

const NewWithdrawalForm = ({
  isSubmitEnabled,
  handleSubmit,
  onBalanceBoxClick,
  currency,
  getCurrencySymbol,
  getCurrencyLabel,
  children,
}) => {
  const { t } = useTranslation('withdrawals')

  return (
    <>
      <div className='form'>
        <div className='avail-box'>
          <AvailableBalanceBox
            currency={currency}
            getCurrencySymbol={getCurrencySymbol}
            getCurrencyLabel={getCurrencyLabel}
            onBalanceClick={onBalanceBoxClick}
          />
        </div>

        {children}
      </div>

      <div className='submit'>
        <Button
          small
          intent={Intent.SUCCESS}
          onClick={handleSubmit}
          disabled={!isSubmitEnabled}
        >
          {t('request_for_withdrawal')}
        </Button>
      </div>
    </>
  )
}

export const NEW_WITHDRAWAL_FORM_PROPS = {
  props: {
    isSubmitEnabled: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onBalanceBoxClick: PropTypes.func,
    currency: PropTypes.string.isRequired,
    getCurrencySymbol: PropTypes.func.isRequired,
    getCurrencyLabel: PropTypes.func.isRequired,
  },
  defaults: {
    onBalanceBoxClick: () => {},
  },
}

NewWithdrawalForm.propTypes = {
  ...NEW_WITHDRAWAL_FORM_PROPS.props,
  children: PropTypes.node.isRequired,
}

NewWithdrawalForm.defaultProps = NEW_WITHDRAWAL_FORM_PROPS.defaults

export default memo(NewWithdrawalForm)
