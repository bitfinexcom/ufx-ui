/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { getDefaultMetadata, showTemplateStory } from '../../../../.storybook/helper'
import Component, { OrderHistory, defaultProps } from '../OrderHistory'
import data from './OrderHistory.stories_data'

export default getDefaultMetadata(OrderHistory, 'Components/OrderHistory')

const props = {
  ...defaultProps,
  orders: data,
}

export const basic = showTemplateStory(Component, props)

export const loading = showTemplateStory(Component, {
  ...props,
  loading: true,
})

export const Empty = showTemplateStory(Component, {
  ...props,
  orders: [],
})
