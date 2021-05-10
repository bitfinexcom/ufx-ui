import React from 'react'

import { ContentDecorator } from './decorators'

export const showTemplateStory = (Component, props) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const Template = (args) => <Component {...args} />

  const Basic = Template.bind({})
  Basic.args = props
  Basic.parameters = {
    controls: { disabled: false },
  }

  return Basic
}

export const hideNoControlsWarn = () => ({
  controls: { hideNoControlsWarning: true },
})

export const hideControlsAddon = () => ({
  controls: { disabled: true },
})

export const getDefaultMetadata = (Component, title, customParameters = {}, addContentDecorator = false) => {

  let params = {}
  if (addContentDecorator) {
    params = {
      decorators: [ContentDecorator]
    }
  }

  return {
    component: Component,
    title: title,
    parameters: {
      ...hideControlsAddon(),
      ...customParameters,
    },
    ...params,
  }
}
