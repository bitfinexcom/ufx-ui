import React, { useState } from 'react'

import { getDefaultMetadata, showTemplateStory } from '../../../../../.storybook/helper'
import Tabs from '../Tabs'
import { tabs } from './Tabs.stories_data'

export default getDefaultMetadata(Tabs, 'Components/ui/Tabs', {}, true)

const props = {
  tabs,
  active: tabs[0].id,
  children: 'Continue',
}

const ControlledComponent = (componentProps) => {
  const [active, setActive] = useState(tabs[4].id)
  return (
    <Tabs
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...componentProps}
      active={active}
      onChange={(value) => setActive(value)}
    />
  )
}

export const basic = showTemplateStory(ControlledComponent, props)
