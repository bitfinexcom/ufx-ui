/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'

import {
  getDefaultMetadata,
  showTemplateStory,
} from '../../../../../../storybook/.storybook/helper'
import { Dropdown } from '../Dropdown'

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
}

const Component = ({ options, ...rest }) => {
  const [value, setValue] = useState('BTC')

  return (
    <Dropdown
      onChange={setValue}
      options={options}
      value={value}
      {...rest}
    />
  )
}

export const basic = showTemplateStory(Component, props)

export const searchable = showTemplateStory(Component, {
  ...props,
  searchable: true,
})

const optionRenderer = (key, value) => (
  <div className='custom-renderer'>
    {key} - {value}
  </div>
)

const valueRenderer = (key, value) => `${key} - ${value}`

export const customRenderer = showTemplateStory(Component, {
  ...props,
  optionRenderer,
  valueRenderer,
})

export const small = showTemplateStory(Component, { ...props, small: true })
