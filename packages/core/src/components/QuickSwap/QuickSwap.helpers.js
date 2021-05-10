/* eslint-disable import/prefer-default-export */
import { requiredPositiveNumber } from '@ufx-ui/utils'
import * as Yup from 'yup'

export const getInitialState = (defFromToken, defToToken) => ({
  fromToken: defFromToken,
  fromAmount: '',
  toToken: defToToken,
  toAmount: '',
  acceptedTerms: false,
})

export const formSchema = t => Yup.object({
  fromAmount: requiredPositiveNumber(t, t('amount')),
  fromToken: Yup.string()
    .required('error.token_required'),
  toAmount: requiredPositiveNumber(t, t('amount')),
  toToken: Yup.string()
    .required(t('error.token_required'))
    .notOneOf([Yup.ref('fromToken'), null], t('error.must_not_be_same')),
  acceptedTerms: Yup.bool()
    .oneOf([true], t('error.accept_terms')),
})

export const validateForm = (getAvailableBalance, t) => (values) => {
  const errors = {}
  const {
    fromAmount, fromToken, toAmount, toToken,
  } = values
  const availFromAmount = getAvailableBalance(fromToken)
  const availToAmount = getAvailableBalance(toToken)

  // check for errors
  if (fromAmount > availFromAmount) {
    errors.fromAmount = t('error:not_enough_balance', { amount: availFromAmount })
  } else {
    errors.fromAmount = ''
  }
  if (toAmount > availToAmount) {
    errors.toAmount = t('error:not_enough_balance', { amount: availToAmount })
  }
  return errors
}
