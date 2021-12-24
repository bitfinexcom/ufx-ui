/* eslint-disable react/jsx-props-no-spreading */
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

import { getDefaultMetadata, showTemplateStory } from '../../../../../../storybook/.storybook/helper'
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

const Component = ({ value: v, ...rest }) => {
  const [value, setValue] = useState(v)

  return <Input value={value} onChange={setValue} {...rest} />
}

export const basic = showTemplateStory(Component)
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
  ...props,
}

export const disabled = showTemplateStory(Component, {
  ...props,
  disabled: true,
})

export const small = showTemplateStory(Component, {
  ...props,
  small: true,
})

export const leftElement = showTemplateStory(Component, {
  ...props,
  leftElement: <FontAwesomeIcon className='icon-left' icon={faUser} size='lg' />,
})

export const rightElement = showTemplateStory(Component, {
  ...props,
  rightElement: <FontAwesomeIcon className='icon-right' icon={faUser} size='lg' />,
})

export const error = showTemplateStory(Component, {
  ...props,
  value: null,
  error: 'Amount is required',
})
