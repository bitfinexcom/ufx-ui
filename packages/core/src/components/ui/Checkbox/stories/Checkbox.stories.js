/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import Checkbox from '../Checkbox'

export default getDefaultMetadata(Checkbox, 'Components/ui/Checkbox', {}, true)

const props = {
  label: 'Auto Save',
  checked: false,
  helpMessage: 'This is a custom help message!',
}

export const basic = showTemplateStory(Checkbox, props)

export const state = () => (
  <>
    <Checkbox label='Unchecked' checked={false} />
    <Checkbox label='Checked' checked />
  </>
)

export const small = showTemplateStory(Checkbox, { ...props, small: true })

export const disabled = showTemplateStory(Checkbox, { ...props, disabled: true })

export const error = showTemplateStory(Checkbox, {
  ...props,
  error: 'Please agree to terms',
})
