/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import data from './OrderHistory.stories_data'
import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component, { OrderHistory, defaultProps } from '../OrderHistory'
import { KEYS } from '../OrderHistory.constants'

export default getDefaultMetadata(OrderHistory, 'Components/OrderHistory')

const props = {
  ...defaultProps,
  orders: data,
}

const {
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
  UPDATED,
} = KEYS

export const basic = showTemplateStory(Component, props)

export const customRowMapping = showTemplateStory(Component, {
  ...props,
  rowMapping: {
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
    [ID]: {
      index: 0,
    },
    [PRICE]: {
      index: 1,
    },
    [AMOUNT]: {
      index: 2,
    },
    [TYPE]: {
      index: 3,
    },
    [STATUS]: {
      index: 4,
    },
    [PRICE_AVERAGE]: {
      index: 5,
    },
    [PAIR]: {
      index: 6,
    },
    [UPDATED]: {
      index: 7,
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
