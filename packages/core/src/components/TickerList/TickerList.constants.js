/* eslint-disable import/prefer-default-export */
import { formatPrice, formatVolume } from '@ufx-ui/utils'

export const KEYS = {
  ID: 'id',
  BASE_CCY: 'baseCcy',
  QUOTE_CCY: 'quoteCcy',
  LAST_PRICE: 'lastPrice',
  CHANGE_PERC: 'changePerc',
  CCY_LABELS: 'ccyLabels',
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

export const STYLES = {
  favorite: { width: '8%', justifyContent: 'flex-start' },
  pair: {
    width: '24%',
    justifyContent: 'flex-start',
    wordBreak: 'break-all',
    whiteSpace: 'normal',
    lineHeight: 1,
  },
  lastPrice: { width: '24%', justifyContent: 'flex-end' },
  changePerc: { width: '18%', justifyContent: 'flex-end' },
  volume: { width: '26%', justifyContent: 'flex-end' },
}
