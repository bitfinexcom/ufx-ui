/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import { action } from '@storybook/addon-actions'

import data from './Orders.stories_data'
import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component, { Orders, defaultProps } from '../Orders'

export default getDefaultMetadata(Orders, 'Components/Orders')

const props = {
  ...defaultProps,
  data,
  cancelOrder: action('on cancel order'),
}

export const basic = showTemplateStory(Component, props)

export const loading = showTemplateStory(Component, {
  ...props,
  loading: true,
})

export const empty = showTemplateStory(Component, {
  ...props,
  orders: [],
})
