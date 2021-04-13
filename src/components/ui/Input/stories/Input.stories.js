/* eslint-disable react/jsx-props-no-spreading */
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { getDefaultMetadata, showTemplateStory } from '../../../../../.storybook/helper'
import * as Props from '../../../../common/props'
import Input from '../Input'
import './_Input.scss'

const { TEXT_ALIGNMENT } = Props

export default getDefaultMetadata(Input, 'Components/ui/Input', {}, true)

const props = {
  type: 'number',
  value: 2.125,
  label: 'Amount',
}

export const basic = showTemplateStory(Input)
basic.argTypes = {
  alignText: {
    control: {
      type: 'select',
      options: Object.values(TEXT_ALIGNMENT),
    },
  },
}
basic.args = {
  alignText: TEXT_ALIGNMENT.LEFT,
}

export const disabled = showTemplateStory(Input, {
  ...props,
  disabled: true,
})

export const small = showTemplateStory(Input, {
  ...props,
  small: true,
})

export const leftElement = showTemplateStory(Input, {
  ...props,
  leftElement: <FontAwesomeIcon className='icon-left' icon={faUser} size='lg' />,
})

export const rightElement = showTemplateStory(Input, {
  ...props,
  rightElement: <FontAwesomeIcon className='icon-right' icon={faUser} size='lg' />,
})

export const error = showTemplateStory(Input, {
  ...props,
  value: null,
  error: 'Amount is required',
})
