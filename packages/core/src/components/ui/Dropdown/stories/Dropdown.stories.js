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
}

export const basic = showTemplateStory(Dropdown, props)

export const searchable = showTemplateStory(Dropdown, {
  ...props,
  searchable: true,
})

const optionRenderer = (key, value) => (
  <div className='custom-renderer'>
    {key} - {value}
  </div>
)

const valueRenderer = (key, value) => `${key} - ${value}`

export const customRenderer = showTemplateStory(Dropdown, {
  ...props,
  optionRenderer,
  valueRenderer,
})
