import { DepthChartToolbar } from '@ufx-ui/core'
import React, { useCallback, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { set } from '../../redux/actions/UI.actions'
import { DEPTH_CHART_ZOOM } from '../../redux/constants/UI.constants'
import { getUIDepthChartZoom } from '../../redux/selectors/UI.selectors'
import { depthChart } from '../../var/config'

const DepthChartToolbarContainer = () => {
  const zoom = useSelector(getUIDepthChartZoom)

  const dispatch = useDispatch()
  const updateZoom = useCallback(
    (value) => {
      dispatch(set({
        section: DEPTH_CHART_ZOOM,
        value: Math.min(Math.max(depthChart.MIN_ZOOM, zoom + value), depthChart.MAX_ZOOM),
      }))
    },
    [dispatch, zoom],
  )

  return (
    <DepthChartToolbar
      config={depthChart}
      zoom={zoom}
      updateZoom={updateZoom}
    />
  )
}

export default memo(DepthChartToolbarContainer)
