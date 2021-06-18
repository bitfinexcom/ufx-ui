/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import { getDefaultMetadata, showTemplateStory } from '../../../../../../storybook/.storybook/helper'
import Dropdown from '../Dropdown'

export default getDefaultMetadata(Dropdown, 'Components/ui/Dropdown', {}, true)

const props = {
  options: {
    BTC: 'Bitcoin',
    ETH: 'Ethereum',
    USDT: 'Tether',
    ADA: 'Cardano',
    DOGE: 'Dogecoin',
    XRP: 'XRP',
    DOT: 'Polkadot',
    UNI: 'Uniswap',
  },
  value: 'BTC',
  searchValues: {
    BTC: ['Bitcoin', 'BTC'],
    ETH: ['Ethereum', 'ETH'],
    USDT: ['Tether', 'USDT'],
    ADA: ['Cardano', 'ADA'],
    DOGE: ['Dogecoin', 'DOGE'],
    XRP: ['XRP'],
    DOT: ['Polkadot', 'DOT'],
    UNI: ['Uniswap', 'UNI'],
  },
}

export const basic = showTemplateStory(Dropdown, props)

export const searchable = showTemplateStory(Dropdown, {
  ...props,
  searchable: true,
})

const renderer = (key, value) => (
  <div className='custom-renderer'>
    {key} - {value}
  </div>
)

export const customRenderer = showTemplateStory(Dropdown, {
  ...props,
  valueRenderer: renderer,
  optionRenderer: renderer,
})
