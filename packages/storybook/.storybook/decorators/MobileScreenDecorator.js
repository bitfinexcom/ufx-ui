import React from 'react'

// mobile view for storybook
const MobileScreenDecorator = (Story) => (
  <div style={{ width: '480px' }}>
    <Story />
  </div>
)

export default MobileScreenDecorator
