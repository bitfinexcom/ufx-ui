/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import { action } from '@storybook/addon-actions'

import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component, { OrderForm, defaultProps } from '../OrderForm'

export default { ...getDefaultMetadata(OrderForm), title: 'Components/OrderForm' }

const props = {
  ...defaultProps,
  baseCcy: 'BTC',
  quoteCcy: 'USD',
  topBid: 9990,
  topAsk: 9995,
  submitOrder: action('on submit order click'),
}

export const basic = showTemplateStory(Component, props)

export const disabled = showTemplateStory(Component, {
  ...props,
  disabled: true,
})
