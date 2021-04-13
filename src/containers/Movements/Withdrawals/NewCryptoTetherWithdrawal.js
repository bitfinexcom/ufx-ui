import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { getPaymentIdLabel } from '../../../utils/movements'
import { TetherTransport, CcyUSDAmountInput } from '../common'
import { WALLET_PROPS, TETHER_PROTOCOL_PROPS } from '../Movements.props'
import {
  WithdrawalWalletSelect,
  WithdrawalPaymentIdInput,
  WithdrawalAddressInput,
} from './common'
import NewWithdrawalForm, { NEW_WITHDRAWAL_FORM_PROPS } from './NewWithdrawalForm'

const NewCryptoTetherWithdrawal = ({
  formState,
  isNoPaymentIdChecked,
  onBalanceBoxClick,
  onAddressInputChange,
  onPaymentIdChange,
  onNoPaymentIdChange,
  onAmountChange,
  onWalletChange,
  isSubmitEnabled,
  wallets,
  handleSubmit,
  hasPaymentId,
  getCurrencyLabel,
  getCurrencySymbol,
  currency,
  isTether,
  tetherProtocols,
  handleTetherProtocolChange,
}) => {
  const symbol = getCurrencySymbol(currency)
  const currencyLabel = getCurrencyLabel(currency)
  const paymentIdLabel = getPaymentIdLabel(currency)

  return (
    <NewWithdrawalForm
      isSubmitEnabled={isSubmitEnabled}
      handleSubmit={handleSubmit}
      onBalanceBoxClick={onBalanceBoxClick}
      currency={currency}
      getCurrencySymbol={getCurrencySymbol}
      getCurrencyLabel={getCurrencyLabel}
    >
      {isTether && (
        <TetherTransport
          tetherProtocols={tetherProtocols}
          method={formState.method}
          setMethod={handleTetherProtocolChange}
        />
      )}

      <WithdrawalAddressInput
        value={formState.address}
        onChange={onAddressInputChange}
      />

      {hasPaymentId && (
        <WithdrawalPaymentIdInput
          currency={currency}
          label={paymentIdLabel}
          value={formState.payment_id}
          onChange={onPaymentIdChange}
          isNoPaymentIdChecked={isNoPaymentIdChecked}
          onNoPaymentIdChange={onNoPaymentIdChange}
          currencyLabel={currencyLabel}
        />
      )}

      <CcyUSDAmountInput
        currency={currency}
        symbol={symbol}
        value={formState.amount}
        onChange={onAmountChange}
        showUsdEquivalent={!isTether}
      />

      <WithdrawalWalletSelect
        value={formState.wallet}
        onChange={onWalletChange}
        wallets={wallets}
      />
    </NewWithdrawalForm>
  )
}

NewCryptoTetherWithdrawal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  formState: PropTypes.object.isRequired,
  isNoPaymentIdChecked: PropTypes.bool.isRequired,
  onAddressInputChange: PropTypes.func.isRequired,
  onPaymentIdChange: PropTypes.func.isRequired,
  onNoPaymentIdChange: PropTypes.func.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  onWalletChange: PropTypes.func.isRequired,
  wallets: WALLET_PROPS,
  ...NEW_WITHDRAWAL_FORM_PROPS.props,
  hasPaymentId: PropTypes.bool.isRequired,
  tetherProtocols: TETHER_PROTOCOL_PROPS,
  isTether: PropTypes.bool,
  handleTetherProtocolChange: PropTypes.func,
}

NewCryptoTetherWithdrawal.defaultProps = {
  ...NEW_WITHDRAWAL_FORM_PROPS.defaults,
  wallets: [],
  isTether: false,
  tetherProtocols: [],
  handleTetherProtocolChange: () => {},
}

export default memo(NewCryptoTetherWithdrawal)
