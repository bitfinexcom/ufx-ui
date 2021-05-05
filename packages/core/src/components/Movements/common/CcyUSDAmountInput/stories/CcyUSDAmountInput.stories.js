import { getDefaultMetadata, showTemplateStory } from '../../../../../../../../.storybook/helper'
import Component, { CcyUSDAmountInput, defaultProps } from '../CcyUSDAmountInput'

export default getDefaultMetadata(CcyUSDAmountInput, 'Components/Movements/CcyUSDAmountInput')

const props = {
  ...defaultProps,
  convertCcy: ({ volume }) => volume / 50,
  symbol: 'XRP',
  currency: 'XRP',
  value: '10',
  onChange: () => {},
}

export const basic = showTemplateStory(Component, props)

export const error = showTemplateStory(Component, {
  ...props,
  error: 'Min amount required is 5',
})
export const minAmount = showTemplateStory(Component, {
  ...props,
  minAmount: 1,
})

export const USDInput = showTemplateStory(Component, {
  ...props,
  showUsdEquivalent: true,
})
