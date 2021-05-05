/* eslint-disable import/prefer-default-export */
import { i18n } from '@ufx-ui/core'
import _get from 'lodash/get'

import { requestNewDepositAddress } from '../../../api/movements'
import { EOS } from '../constants'

const LIMIT_ERROR = 'count: limit'

export const depositAddressTerm = (ccy, currencyPool) => {
  if (currencyPool === EOS) {
    return i18n.t('deposits:memos')
  }

  switch (ccy) {
    case 'XMR':
      return i18n.t('deposits:payment_ids')
    case 'XRP':
      return i18n.t('deposits:tags')
    case 'XLM':
    case 'WLO':
      return i18n.t('deposits:memos')
    default:
      return i18n.t('deposits:addresses')
  }
}

export const requestWalletAddress = ({
  name,
  currency,
  setAddress,
  address,
  notifyError,
}) => {
  requestNewDepositAddress({
    wallet: name,
    method: currency,
  })
    .then((res) => setAddress(_get(res, 'data[4][4]', address)))
    .catch((error) => {
      const message = _get(error, 'message', '')

      if (message === LIMIT_ERROR) {
        notifyError(i18n.t('deposits:address_limit'))
        return
      }

      notifyError(i18n.t('deposits:daemon_down', {
        currency,
      }))
    })
}
