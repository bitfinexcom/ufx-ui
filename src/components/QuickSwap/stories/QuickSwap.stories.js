/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { action } from '@storybook/addon-actions'

import { getDefaultMetadata, showTemplateStory } from '../../../../.storybook/helper'
import Component, { QuickSwap, defaultProps } from '../QuickSwap'

export default getDefaultMetadata(QuickSwap, 'Components/QuickSwap')

const props = {
  ...defaultProps,
  tokenList: {
    btc: 'Bitcoin',
    eth: 'Ethereum',
  },
  getConversionRate: () => 100.12,
  getAvailableBalance: () => 100,
  onSwapClick: action('on click'),
}

export const basic = showTemplateStory(Component, props)
