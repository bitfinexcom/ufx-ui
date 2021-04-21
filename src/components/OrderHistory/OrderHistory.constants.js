import React from 'react'

import { PLATFORM_SETTINGS } from '../../var/config'
import FormattedDate from '../format/FullDate'
import OrderType from '../format/OrderType'
import FormattedValue from '../format/PrettyValue'

const { AMOUNT_DECIMALS, PRICE_SIG_FIGS } = PLATFORM_SETTINGS

export const ORDER_HISTORY_COLUMNS = {
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
  [ORDER_HISTORY_COLUMNS.TYPE]: {
    format: (value) => <OrderType>{value}</OrderType>,
  },
  [ORDER_HISTORY_COLUMNS.AMOUNT]: {
    format: (value) => <FormattedValue value={value} decimals={AMOUNT_DECIMALS} fadeTrailingZeros />,
  },
  [ORDER_HISTORY_COLUMNS.PRICE]: {
    format: (value) => <FormattedValue value={value} sigFig={PRICE_SIG_FIGS} fadeTrailingZeros />,
  },
  [ORDER_HISTORY_COLUMNS.PRICE_AVERAGE]: {
    format: (value) => <FormattedValue value={value} sigFig={PRICE_SIG_FIGS} fadeTrailingZeros />,
  },
  [ORDER_HISTORY_COLUMNS.PLACED]: {
    format: (value) => <FormattedDate ts={value} />,
  },
}

export const BREAKPOINT_SMALL = 576
