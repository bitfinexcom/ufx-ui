import React from 'react'

import { showTemplateStory, getDefaultMetadata } from '../../../../../storybook/.storybook/helper'
import PrettyValue from '../PrettyValue'

export default { ...getDefaultMetadata(PrettyValue), title: 'Components/format/PrettyValue' }

export const basic = showTemplateStory(PrettyValue)

const value = 10.12345

export const symbol = () => (
  <>
    <div>Symbol After: <PrettyValue value={value} symbol='$' /></div>
    <div>Symbol Before: <PrettyValue value={value} symbol='$' symbolBefore /></div>
  </>
)

export const strike = () => (
  <>
    <div>Strike 10: <PrettyValue value={value} strike={10} includeStrike /></div>
    <div>Strike 20: <PrettyValue value={value} strike={20} includeStrike /></div>
  </>
)

export const absolute = () => <PrettyValue value={-123.45} absolute />
