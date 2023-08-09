import { showTemplateStory, getDefaultMetadata } from '../../../../../storybook/.storybook/helper'
import OrderType from '../OrderType'

export default { ...getDefaultMetadata(OrderType), title: 'Components/format/OrderType' }

const props = {
  children: 'EXCHANGE_LIMIT',
}

export const basic = showTemplateStory(OrderType, props)

export const longText = showTemplateStory(OrderType, { children: 'EXCHANGE_LIMIT; details to show in tooltip' })
