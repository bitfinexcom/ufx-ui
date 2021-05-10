import { EditLayoutButton } from '@ufx-ui/core'
import React, { memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { layoutEditEnable, layoutEditClose } from '../../redux/actions/layouts.actions'
import { getLayoutIsEditable } from '../../redux/selectors/layouts.selectors'

const EditLayoutButtonContainer = () => {
  const dispatch = useDispatch()
  const layoutIsEditable = useSelector(getLayoutIsEditable)
  const enableEditLayout = useCallback(() => dispatch(layoutEditEnable()), [dispatch])
  const closeEditLayout = useCallback(() => dispatch(layoutEditClose()), [dispatch])

  return (
    <EditLayoutButton
      layoutIsEditable={layoutIsEditable}
      enableEditLayout={enableEditLayout}
      closeEditLayout={closeEditLayout}
    />
  )
}

export default memo(EditLayoutButtonContainer)
