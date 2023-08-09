import React from 'react'

import { getDefaultMetadata, showTemplateStory } from '../../../../../../storybook/.storybook/helper'
import { Menu } from '../Menu'
import MenuDivider from '../MenuDivider'
import MenuItem from '../MenuItem'

export default { ...getDefaultMetadata(Menu, {}, true), title: 'Components/ui/Menu' }

const Component = () => (
  <Menu>
    <MenuItem>Top element</MenuItem>
    <MenuDivider />
    <MenuItem>Menu element #1</MenuItem>
    <MenuItem>Menu element #2</MenuItem>
    <MenuItem>Menu element #3</MenuItem>
  </Menu>
)

export const basic = showTemplateStory(Component, {})
