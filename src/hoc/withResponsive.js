import React, { forwardRef } from 'react'

import Responsive from '../components/Responsive'

// disabled arrow-callback rule to have display name in devtools instead of Anonymous
// eslint-disable-next-line prefer-arrow-callback
const ResponsiveWrapper = (Component) => forwardRef(function ResponsiveWrapperComp(props, ref) {
  return (
    <Responsive>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component ref={ref} {...props} />
    </Responsive>
  )
})

export default ResponsiveWrapper
