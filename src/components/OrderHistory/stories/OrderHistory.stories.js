/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { getDefaultMetadata, showTemplateStory } from '../../../../.storybook/helper'
import Component, { OrderHistory, defaultProps } from '../OrderHistory'
import { KEYS } from '../OrderHistory.constants'
import data from './OrderHistory.stories_data'

export default getDefaultMetadata(OrderHistory, 'Components/OrderHistory')

const props = {
  ...defaultProps,
  orders: data,
}

export const basic = showTemplateStory(Component, props)

export const customColumns = showTemplateStory(Component, {
  ...props,
  columns: [
    KEYS.PRICE,
    KEYS.AMOUNT,
    KEYS.TYPE,
    KEYS.STATUS,
    KEYS.PRICE_AVERAGE,
    KEYS.PAIR,
  ],
})

export const loading = showTemplateStory(Component, {
  ...props,
  loading: true,
})

export const Empty = showTemplateStory(Component, {
  ...props,
  orders: [],
})
