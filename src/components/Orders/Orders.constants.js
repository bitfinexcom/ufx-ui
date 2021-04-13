import React from 'react'

import { PLATFORM_SETTINGS } from '../../var/config'
import FormattedDate from '../format/FullDate'
import OrderType from '../format/OrderType'
import FormattedValue from '../format/PrettyValue'

const { AMOUNT_DECIMALS, PRICE_SIG_FIGS } = PLATFORM_SETTINGS

export const CANCEL_TIMEOUT_MS = 1500

export const KEYS = {
  ID: 'id',
  PAIR: 'pair',
  TYPE: 'type',
  BASE_CCY: 'baseCcy',
  AMOUNT: 'amount',
  PRICE: 'price',
  STATUS: 'status',
  PLACED: 'placed',
}

export const MAPPING = {
  [KEYS.TYPE]: {
    format: (value) => <OrderType>{value}</OrderType>,
  },
  [KEYS.AMOUNT]: {
    format: (value) => <FormattedValue value={value} decimals={AMOUNT_DECIMALS} fadeTrailingZeros />,
  },
  [KEYS.PRICE]: {
    format: (value) => <FormattedValue value={value} sigFig={PRICE_SIG_FIGS} fadeTrailingZeros />,
  },
  [KEYS.PLACED]: {
    format: (value) => <FormattedDate ts={value} />,
  },
}

export const BREAKPOINT_SMALL = 576
