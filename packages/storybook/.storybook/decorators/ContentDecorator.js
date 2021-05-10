import React from 'react'

const style = {
  display: 'grid',
  gridGap: '20px',
  justifyContent: 'center',
}

// Content area wrapper for storybook
const ContentDecorator = (Story) => (
  <div style={style}>
    <Story />
  </div>
)

export default ContentDecorator
