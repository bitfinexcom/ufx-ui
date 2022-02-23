import React from 'react'

import {
  showTemplateStory,
  getDefaultMetadata,
} from '../../../../../../storybook/.storybook/helper'
import Flex from '../Flex'

export default getDefaultMetadata(Flex, 'Components/ui/Flex', {}, true)

const props = {
  children: (
    <>
      <p>First element</p>
      <p>Second element</p>
    </>
  ),
}

export const horizontal = showTemplateStory(Flex, { ...props, horizontal: true, style: { width: '200px', justifyContent: 'space-between' } })
export const vertical = showTemplateStory(Flex, props)
