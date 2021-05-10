import React from 'react'

import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import Component from '../Spinner'

export default getDefaultMetadata(Component, 'Components/ui/Spinner')

export const basic = showTemplateStory(Component)

export const withoutWrapperClass = showTemplateStory(Component, { useWrapper: false })

const containerStyle = { display: 'flex', flexDirection: 'column' }

const rowStyle = {
  display: 'grid',
  gridTemplateColumns: '100px 20px',
  alignItems: 'flex-end',
  justifyContent: 'center',
}

export const sizes = () => (
  <div style={containerStyle}>
    <div style={rowStyle}>
      <div>Extra Small</div>
      <Component size='xs' useWrapper={false} />
    </div>
    <div style={rowStyle}>
      <div>Small</div>
      <Component size='sm' useWrapper={false} />
    </div>
    <div style={rowStyle}>
      <div>Large</div>
      <Component size='lg' useWrapper={false} />
    </div>
    <div style={rowStyle}>
      <div>2x</div>
      <Component size='2x' useWrapper={false} />
    </div>
  </div>
)
