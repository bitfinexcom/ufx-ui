/* eslint-disable import/prefer-default-export */
import { TICKERLIST_KEYS } from '@ufx-ui/core'

export const ROW_MAPPING = {
  [TICKERLIST_KEYS.VOLUME]: {
    selector: 'volumeConverted',
  },
}

export const VOLUME_UNIT = {
  USD: 'USD',
  ETH: 'ETH',
  SELF: 'SELF',
  BTC: 'BTC',
}

export const VOLUME_UNIT_PAPER = {
  SELF: 'SELF',
  TESTBTC: 'TESTBTC',
  TESTUSD: 'TESTUSD',
}
