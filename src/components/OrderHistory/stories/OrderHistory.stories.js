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

export const basic = showTemplateStory(Component, props)

export const customColumns = showTemplateStory(Component, {
  ...props,
  columns: [
    ORDER_HISTORY_COLUMNS.PRICE,
    ORDER_HISTORY_COLUMNS.AMOUNT,
    ORDER_HISTORY_COLUMNS.TYPE,
    ORDER_HISTORY_COLUMNS.STATUS,
    ORDER_HISTORY_COLUMNS.PRICE_AVERAGE,
    ORDER_HISTORY_COLUMNS.PAIR,
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
