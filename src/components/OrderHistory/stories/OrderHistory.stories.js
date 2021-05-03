/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { getDefaultMetadata, showTemplateStory } from '../../../../.storybook/helper'
import Component, { OrderHistory, defaultProps } from '../OrderHistory'
import { ORDER_HISTORY_COLUMNS } from '../OrderHistory.constants'
import data from './OrderHistory.stories_data'

export default getDefaultMetadata(OrderHistory, 'Components/OrderHistory')

const props = {
  ...defaultProps,
  orders: data,
}

const {
  ICON,
  ID,
  PAIR,
  TYPE,
  BASE_CCY,
  QUOTE_CCY,
  AMOUNT,
  ORIGINAL_AMOUNT,
  PRICE,
  PRICE_AVERAGE,
  PLACED,
  STATUS,
} = ORDER_HISTORY_COLUMNS

export const basic = showTemplateStory(Component, props)

export const customRowMapping = showTemplateStory(Component, {
  ...props,
  rowMapping: {
    [ID]: {
      hidden: true,
    },
    [BASE_CCY]: {
      hidden: true,
    },
    [QUOTE_CCY]: {
      hidden: true,
    },
    [ORIGINAL_AMOUNT]: {
      hidden: true,
    },
    [PLACED]: {
      hidden: true,
    },
    [ICON]: {
      index: 0,
      truncate: true,
    },
    [PRICE]: {
      index: 1,
      truncate: true,
    },
    [AMOUNT]: {
      index: 2,
      truncate: true,
    },
    [TYPE]: {
      index: 3,
      truncate: true,
    },
    [STATUS]: {
      index: 4,
      truncate: true,
    },
    [PRICE_AVERAGE]: {
      index: 5,
      truncate: true,
    },
    [PAIR]: {
      index: 6,
      truncate: true,
    },
  },
})

export const loading = showTemplateStory(Component, {
  ...props,
  loading: true,
})

export const Empty = showTemplateStory(Component, {
  ...props,
  orders: [],
})
