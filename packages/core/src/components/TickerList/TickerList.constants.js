/* eslint-disable import/prefer-default-export */
import { formatPrice, formatVolume } from '@ufx-ui/utils'

export const KEYS = {
  ID: 'id',
  BASE_CCY: 'baseCcy',
  QUOTE_CCY: 'quoteCcy',
  LAST_PRICE: 'lastPrice',
  CHANGE_PERC: 'changePerc',
  LABELS: 'labels',
  VOLUME: 'volume',
}

const formatVolumePerc = (value) => `${(value * 100).toFixed(2)}%`

export const MAPPING = {
  [KEYS.LAST_PRICE]: {
    defaultValue: 0,
    format: formatPrice,
  },
  [KEYS.CHANGE_PERC]: {
    defaultValue: 0,
    format: formatVolumePerc,
  },
  [KEYS.VOLUME]: {
    defaultValue: 0,
    format: formatVolume,
  },
}
