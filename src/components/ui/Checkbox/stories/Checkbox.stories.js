/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import { showTemplateStory, getDefaultMetadata } from '../../../../../.storybook/helper'
import Checkbox from '../Checkbox'

export default getDefaultMetadata(Checkbox, 'Components/ui/Checkbox', {}, true)

const props = {
  label: 'Auto Save',
  checked: false,
}

export const basic = showTemplateStory(Checkbox, props)

export const state = () => (
  <>
    <Checkbox label='Uncheked' checked={false} />
    <Checkbox label='Cheked' checked />
  </>
)

export const small = showTemplateStory(Checkbox, { ...props, small: true })

export const disabled = showTemplateStory(Checkbox, { ...props, disabled: true })

export const error = showTemplateStory(Checkbox, {
  ...props,
  error: 'Please agree to terms',
})
