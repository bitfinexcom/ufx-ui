/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'

import { getDefaultMetadata, showTemplateStory } from '../../../../../.storybook/helper'
import Popover, { PopoverPosition } from '../Popover'

export default getDefaultMetadata(Popover, 'Components/ui/Popover', {}, true)

const props = {
  content: <div style={{ padding: 10, color: 'white' }}>Lorem ipsum dolor sit amet.</div>,
  children: <button type='button'>Click Me!</button>,
}

export const basic = showTemplateStory(Popover, props)

export const position = () => (
  <div style={{ margin: '20px 100px' }}>
    <div>
      <Popover {...props}>
        <button type='button'>Position - auto</button>
      </Popover>
    </div>
    <div style={{ margin: '50px 0' }}>
      <Popover {...props} position={PopoverPosition.LEFT}>
        <button type='button'>Position - left</button>
      </Popover>

      <Popover {...props} position={PopoverPosition.RIGHT}>
        <button style={{ marginLeft: '50px' }} type='button'>Position - right</button>
      </Popover>
    </div>
    <div style={{ margin: '50px 0' }}>
      <Popover {...props} position={PopoverPosition.TOP}>
        <button type='button'>Position - top</button>
      </Popover>

      <Popover {...props} position={PopoverPosition.BOTTOM}>
        <button style={{ marginLeft: '50px' }} type='button'>Position - bottom</button>
      </Popover>
    </div>
  </div>
)
