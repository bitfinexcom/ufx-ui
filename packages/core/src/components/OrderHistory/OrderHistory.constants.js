import { PLATFORM_SETTINGS } from '@ufx-ui/utils'
import memoizeOne from 'memoize-one'
import React from 'react'

import FormattedDate from '../format/FullDate'
import OrderType from '../format/OrderType'
import FormattedValue from '../format/PrettyValue'

const { AMOUNT_DECIMALS, PRICE_SIG_FIGS } = PLATFORM_SETTINGS

export const MIN_TABLE_WIDTH = 600

export const KEYS = {
  ICON: 'icon',
  ID: 'id',
  PAIR: 'pair',
  TYPE: 'type',
  BASE_CCY: 'baseCcy',
  QUOTE_CCY: 'quoteCcy',
  AMOUNT: 'amount',
  ORIGINAL_AMOUNT: 'originalAmount',
  PRICE: 'price',
  PRICE_AVERAGE: 'priceAverage',
  PLACED: 'placed',
  STATUS: 'status',
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
  [KEYS.PRICE_AVERAGE]: {
    format: (value) => <FormattedValue value={value} sigFig={PRICE_SIG_FIGS} fadeTrailingZeros />,
  },
  [KEYS.PLACED]: {
    format: (value) => <FormattedDate ts={value} />,
  },
}

export const getStyles = memoizeOne((isMobile) => ({
  ID: { width: '3%' },
  PAIR: { width: isMobile ? '17%' : '12%' },
  TYPE: { width: '10%' },
  AMOUNT: { width: '15%' },
  CCY: { width: '7%' },
  PRICE: { width: isMobile ? '20%' : '12.5%' },
  PRICE_AVERAGE: { width: isMobile ? '18%' : '12.5%' },
  STATUS: { width: isMobile ? '20%' : '13%' },
  PLACED: { width: '15%' },
  ACTION: { width: '3%' },
}))
