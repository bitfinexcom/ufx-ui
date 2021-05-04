/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import { getDefaultMetadata, showTemplateStory } from '../../../../../../storybook/.storybook/helper'
import Dropdown from '../Dropdown'

export default getDefaultMetadata(Dropdown, 'Components/ui/Dropdown', {}, true)

const props = {
  options: {
    BTC: 'Bitcoin',
    Eth: 'Ethereum',
  },
  value: 'BTC',
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
