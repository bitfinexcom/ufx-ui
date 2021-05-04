import * as Yup from 'yup'

import { isValidDate, isValidTifDate } from './common'
import { checkDecimals, getDigits } from './number'

const NUMBER_INPUT_MAX_LENGTH = 20

export const isNotInfinite = (number) => !number || Number.isFinite(number)

export const isValidLength = (value) => getDigits(value) <= NUMBER_INPUT_MAX_LENGTH

export const requiredPositiveNumber = (t, fieldLabel) => Yup.number()
  .typeError(t('error:must_be_number', { fieldLabel }))
  .required(t('error:required', { fieldLabel }))
  .positive(t('error:must_be_positive', { fieldLabel }))
  .test('not_infinite', t('error:must_be_number', { fieldLabel }), isNotInfinite)

export const validateLength = (t, fieldLabel) => Yup.number()
  .test(
    'length',
    t('error:max_length', { fieldLabel, maxLength: NUMBER_INPUT_MAX_LENGTH }),
    isValidLength,
  )

export const validateDecimals = (maxDecimals, t, fieldLabel) => Yup.number()
  .test({
    name: 'validate-decimals',
    test(value) {
      return checkDecimals(maxDecimals, this.createError, t, fieldLabel)(value)
    },
  })

export const requiredDate = (t, fieldLabel) => Yup.mixed()
  .typeError(t('error:required', { fieldLabel }))
  .required(t('error:required', { fieldLabel }))
  .test('valid_date', t('error:must_be_date'), isValidDate)

export const validateExpiryDate = (t, minDays, maxDays) => Yup.mixed()
  .test({
    name: 'validate-expiry-date',
    test(value) {
      return isValidTifDate(this.createError, t, minDays, maxDays)(value)
    },
  })
