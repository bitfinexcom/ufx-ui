import React from 'react'

import { showTemplateStory, getDefaultMetadata } from '../../../../../storybook/.storybook/helper'
import FadeTrailingZeros from '../FadeTrailingZeros'

export default { ...getDefaultMetadata(FadeTrailingZeros), title: 'Components/format/FadeTrailingZeros' }

const props = {
  value: '10.1000',
}

export const basic = showTemplateStory(FadeTrailingZeros, props)

export const examples = () => (
  <>
    <div><FadeTrailingZeros value='23.12345' /></div>
    <div><FadeTrailingZeros value='10.1000' /></div>
    <div><FadeTrailingZeros value='10.0001' /></div>
    <div><FadeTrailingZeros value={10.200} /></div>
    <div><FadeTrailingZeros value='0.00' /></div>
  </>
)
