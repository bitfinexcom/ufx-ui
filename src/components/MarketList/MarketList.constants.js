import { formatPrice, formatVolume, formatVolumePercentChange } from '../../functions/number'

export const FAV_TAB = 'fav_tab'

export const ACTION_TYPES = {
  SET_FILTER: 'SET_FILTER',
  SET_SORT: 'SET_SORT',
  SET_FAV: 'SET_FAV',
}

export const KEYS = {
  ID: 'id',
  FAV: 'fav',
  BASE_CCY: 'baseCcy',
  QUOTE_CCY: 'quoteCcy',
  LAST_PRICE: 'lastPrice',
  CHANGE_PERC: 'changePerc',
  HIGH: 'high',
  LOW: 'low',
  VOLUME: 'volume',
}

export const MAPPING = {
  [KEYS.LAST_PRICE]: {
    defaultValue: 0,
    format: formatPrice,
  },
  [KEYS.CHANGE_PERC]: {
    defaultValue: 0,
    format: formatVolumePercentChange,
  },
  [KEYS.HIGH]: {
    defaultValue: 0,
    format: formatPrice,
  },
  [KEYS.LOW]: {
    defaultValue: 0,
    format: formatPrice,
  },
  [KEYS.VOLUME]: {
    defaultValue: 0,
    format: formatVolume,
  },
}
