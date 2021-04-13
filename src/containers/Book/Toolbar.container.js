import React, { useCallback, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { BookToolbar } from '../../components'
import { set } from '../../redux/actions/UI.actions'
import { BOOK_PREC, BOOK_ZOOM } from '../../redux/constants/UI.constants'
import { getUIBookPrec, getUIBookZoom } from '../../redux/selectors/UI.selectors'
import { book } from '../../var/config'

const ToolbarContainer = () => {
  const prec = useSelector(getUIBookPrec)
  const zoom = useSelector(getUIBookZoom)

  const dispatch = useDispatch()
  const setPrec = useCallback(
    (value) => {
      dispatch(set({
        section: BOOK_PREC,
        value,
      }))
    },
    [dispatch],
  )

  const updateZoom = useCallback(
    (value) => {
      dispatch(set({
        section: BOOK_ZOOM,
        value: Math.min(Math.max(book.MIN_ZOOM, zoom + value), book.MAX_ZOOM),
      }))
    },
    [dispatch, zoom],
  )

  return (
    <BookToolbar
      prec={prec}
      updatePrec={setPrec}
      zoom={zoom}
      updateZoom={updateZoom}
      config={book}
    />
  )
}

export default memo(ToolbarContainer)
