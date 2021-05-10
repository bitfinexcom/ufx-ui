/* eslint-disable import/prefer-default-export */
import { i18n } from '@ufx-ui/core'
import _toUpper from 'lodash/toUpper'

export const getPaymentIdLabel = (currency) => {
  const ccy = _toUpper(currency)

  if (ccy === 'XMR') {
    return i18n.t('movements:wallet_payment_id')
  }
  if (ccy === 'XRP') {
    return i18n.t('movements:wallet_tag')
  }
  return i18n.t('movements:wallet_memo')
}

export const MOVEMENT_TYPES = {
  DEPOSITS: 'deposits',
  WITHDRAWALS: 'withdrawals',
}

export const MOVEMENT_SUBTYPES = {
  CRYPTO: 'crypto',
  TETHER: 'tether',
}
