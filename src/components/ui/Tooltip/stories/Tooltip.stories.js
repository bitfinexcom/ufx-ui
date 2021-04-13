/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import { getDefaultMetadata, showTemplateStory } from '../../../../../.storybook/helper'
import Tooltip from '../Tooltip'

export default getDefaultMetadata(Tooltip, 'Components/ui/Tooltip', {}, true)

const props = {
  content: 'Lorem, ipsum dolor sit amet consectetur!',
  children: 'Hover over me',
}

export const basic = showTemplateStory(Tooltip, props)

export const placement = () => (
  <div style={{ margin: '20px 100px' }}>
    <div>
      <Tooltip {...props} placement='auto'>
        <button type='button'>Placement - auto</button>
      </Tooltip>
    </div>
    <div style={{ margin: '50px 0' }}>
      <Tooltip {...props} placement='left'>
        <button type='button'>Placement - left</button>
      </Tooltip>
      <Tooltip {...props} placement='right'>
        <button style={{ marginLeft: '50px' }} type='button'>Placement - right</button>
      </Tooltip>
    </div>
    <div style={{ margin: '50px 0' }}>
      <Tooltip {...props} placement='top'>
        <button type='button'>Placement - top</button>
      </Tooltip>
      <Tooltip {...props} placement='bottom'>
        <button style={{ marginLeft: '50px' }} type='button'>Placement - bottom</button>
      </Tooltip>
    </div>
  </div>
)

export const persistent = showTemplateStory(Tooltip, {
  ...props,
  children: <button type='button'>Hover over me, can also select tooltip content</button>,
  persistent: true,
})
