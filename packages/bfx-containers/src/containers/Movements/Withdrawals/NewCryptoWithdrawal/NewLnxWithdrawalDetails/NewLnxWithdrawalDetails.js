import _get from 'lodash/get'
import _toLower from 'lodash/toLower'
import PropTypes from 'prop-types'
import React, {
  memo,
  useReducer,
  useState,
  useCallback,
  useEffect,
} from 'react'

import LnxInvoiceInput from './LnxInvoiceInput.container'
import { WALLET_PROPS } from '../../../Movements.props'
import WithdrawalWalletSelect from '../../common/WithdrawalWalletSelect'
import {
  withdrawalFormReducer,
  SET_FORM_FIELD_ACTION,
  removeWhitespace,
} from '../../helpers'
import NewWithdrawalForm from '../../NewWithdrawalForm'

const initialWithdrawalFormState = {
  invoice: '',
  wallet: '',
}

const NewLnxWithdrawalDetails = ({
  wallets,
  currency,
  getCurrencyLabel,
  getCurrencySymbol,
  getCurrencyTxMethod,
  requestNewWithdraw,
}) => {
  const [formState, dispatch] = useReducer(
    withdrawalFormReducer,
    initialWithdrawalFormState,
  )
  const setFormField = useCallback((field, value) => {
    dispatch({ type: SET_FORM_FIELD_ACTION, payload: { field, value } })
  }, [])

  const [isInvoiceValid, setIsInvoiceValid] = useState(false)

  useEffect(() => {
    // sets initial wallet select value
    setFormField('wallet', _get(wallets, '0.name', ''))
  }, [setFormField, wallets])

  const onInvoiceChange = useCallback(
    (value) => setFormField('invoice', removeWhitespace(value)),
    [setFormField],
  )

  const onWalletChange = useCallback(
    (value) => setFormField('wallet', value),
    [setFormField],
  )

  const handleSubmit = () => {
    const requestData = {
      ...formState,
      method: _toLower(getCurrencyTxMethod(currency)),
    }
    requestNewWithdraw(requestData)
  }

  return (
    <div className='lnx-form-wrapper'>
      <NewWithdrawalForm
        isSubmitEnabled={isInvoiceValid}
        handleSubmit={handleSubmit}
        currency={currency}
        getCurrencySymbol={getCurrencySymbol}
        getCurrencyLabel={getCurrencyLabel}
      >
        <LnxInvoiceInput
          value={formState.invoice}
          onChange={onInvoiceChange}
          setIsInvoiceValid={setIsInvoiceValid}
        />

        <WithdrawalWalletSelect
          value={formState.wallet}
          onChange={onWalletChange}
          wallets={wallets}
        />
      </NewWithdrawalForm>
    </div>
  )
}

NewLnxWithdrawalDetails.propTypes = {
  currency: PropTypes.string.isRequired,
  wallets: WALLET_PROPS,
  getCurrencyLabel: PropTypes.func.isRequired,
  getCurrencySymbol: PropTypes.func.isRequired,
  getCurrencyTxMethod: PropTypes.func.isRequired,
  requestNewWithdraw: PropTypes.func.isRequired,
}

NewLnxWithdrawalDetails.defaultProps = {
  wallets: [],
}

export default memo(NewLnxWithdrawalDetails)
