import React from 'react'

import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import { Spinner } from '../Spinner'

export default { ...getDefaultMetadata(Spinner), title: 'Components/ui/Spinner' }

export const basic = showTemplateStory(Spinner)

export const withoutWrapperClass = showTemplateStory(Spinner, { useWrapper: false })

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
      <Spinner size='xs' useWrapper={false} />
    </div>
    <div style={rowStyle}>
      <div>Small</div>
      <Spinner size='sm' useWrapper={false} />
    </div>
    <div style={rowStyle}>
      <div>Large</div>
      <Spinner size='lg' useWrapper={false} />
    </div>
    <div style={rowStyle}>
      <div>2x</div>
      <Spinner size='2x' useWrapper={false} />
    </div>
  </div>
)
