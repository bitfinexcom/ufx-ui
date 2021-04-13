import _size from 'lodash/size'
import {
  useReducer,
  useState,
  useCallback,
} from 'react'

import {
  withdrawalFormReducer,
  SET_FORM_FIELD_ACTION,
  removeWhitespace,
} from './helpers'

const initialWithdrawalFormState = {
  wallet: '',
  method: '',
  amount: '',
  address: '',
  payment_id: '',
}

const useNewWithdrawalForm = (hasPaymentId) => {
  const [formState, dispatch] = useReducer(
    withdrawalFormReducer,
    initialWithdrawalFormState,
  )
  const setFormField = useCallback((field, value) => {
    dispatch({ type: SET_FORM_FIELD_ACTION, payload: { field, value } })
  }, [])

  const [isNoPaymentIdChecked, setIsNoPaymentIdChecked] = useState(false)

  const onBalanceBoxClick = useCallback(({ balance, wallet }) => {
    setFormField('amount', balance)
    setFormField('wallet', wallet)
  }, [setFormField])

  const onAddressInputChange = useCallback(
    (value) => (
      setFormField('address', removeWhitespace(value))
    ), [setFormField],
  )
  const onPaymentIdChange = useCallback(
    (value) => setFormField('payment_id', removeWhitespace(value)),
    [setFormField],
  )
  const onNoPaymentIdChange = useCallback((checked) => {
    setIsNoPaymentIdChecked(checked)
    if (checked) {
      setFormField('payment_id', '')
    }
  },
  [setFormField])

  const onAmountChange = useCallback(
    (value) => setFormField('amount', value),
    [setFormField],
  )

  const onWalletChange = useCallback(
    (value) => setFormField('wallet', value),
    [setFormField],
  )

  const isSubmitEnabled = (
    _size(formState.address) > 0
    && _size(formState.amount) > 0
    && (!hasPaymentId || _size(formState.payment_id) > 0 || isNoPaymentIdChecked)
  )

  return {
    formState,
    setFormField,
    isNoPaymentIdChecked,
    setIsNoPaymentIdChecked,
    onBalanceBoxClick,
    onAddressInputChange,
    onPaymentIdChange,
    onNoPaymentIdChange,
    onAmountChange,
    onWalletChange,
    isSubmitEnabled,
  }
}

export default useNewWithdrawalForm
