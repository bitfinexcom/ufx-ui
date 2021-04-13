import React, { memo } from 'react'

import BookContainer from './Book.container'
import Toolbar from './Toolbar.container'

const BookWrapper = (props) => (
  <>
    <Toolbar />
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <BookContainer {...props} />
  </>
)

export default memo(BookWrapper)
