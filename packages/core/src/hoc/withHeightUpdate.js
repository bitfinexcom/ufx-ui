/**
 * A basic height control HOC component
 * that modifies Layout Items minHeight dynamically
 * Not exclusive to min height, can be height if you
 * do not want to allow users to resize your component
 */

import _get from 'lodash/get'
import _isFunction from 'lodash/isFunction'
import React, { useEffect } from 'react'
import { withContentRect } from 'react-measure'

import usePrevious from '../hooks/usePrevious'

const withHeightUpdate = (Component) => withContentRect('client')((props) => {
  const {
    onUpdateLayout,
    measureRef: ref,
    contentRect,
  } = props
  const height = _get(contentRect, 'client.height')
  const prevHeight = usePrevious(height)

  useEffect(() => {
    if (height && prevHeight !== height && _isFunction(onUpdateLayout)) {
      onUpdateLayout(height)
    }
  }, [height, onUpdateLayout, prevHeight])

  return (
    <div>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component ref={ref} compRef={ref} {...props} />
    </div>
  )
})

export default withHeightUpdate
