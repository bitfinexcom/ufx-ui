import PropTypes from 'prop-types'
import React, { memo } from 'react'

import {
  BCH_WARN_CCYS, ERC20_WARN_CCYS, ETH_ETC_CCYS, IOTA, AMP,
} from '../../constants'
import {
  ERC20 as ERC20Notice,
  BCH as BCHNotice,
  ETH_ETC as ETH_ETC_NOTICE,
  AMP as AMPNotice,
  IOTA as IOTANotice,
  PaymentId as PaymentIdNotice,
} from '../common/Notices'

const DepositInstructionsForCcy = ({
  currency,
  currencyLabel,
  currencySymbol,
  hasPaymentId,
  paymentIdLabel,
  paymentId,
}) => (
  <>
    {ERC20_WARN_CCYS.includes(currency) && (
      <ERC20Notice currency={currency} currencyLabel={currencyLabel} />
    )}

    {BCH_WARN_CCYS.includes(currency) && (
      <BCHNotice currency={currency} currencyLabel={currencyLabel} />
    )}

    {ETH_ETC_CCYS.includes(currency) && <ETH_ETC_NOTICE />}

    {currency === AMP && <AMPNotice />}

    {currency === IOTA && <IOTANotice /> }

    {hasPaymentId && (
      <PaymentIdNotice
        currency={currency}
        currencySymbol={currencySymbol}
        paymentIdLabel={paymentIdLabel}
        paymentId={paymentId}
      />
    )}
  </>
)

DepositInstructionsForCcy.propTypes = {
  currency: PropTypes.string.isRequired,
  currencyLabel: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  hasPaymentId: PropTypes.bool.isRequired,
  paymentIdLabel: PropTypes.string.isRequired,
  paymentId: PropTypes.string,
}

DepositInstructionsForCcy.defaultProps = {
  paymentId: null,
}

export default memo(DepositInstructionsForCcy)
