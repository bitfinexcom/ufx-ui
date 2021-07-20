/* eslint-disable react/jsx-props-no-spreading */
import { DepthChart, PROP_DEFAULT_CCYS } from '@ufx-ui/core'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import useCommonBfxData from '../../hooks/useCommonBfxData'
import { set } from '../../redux/actions/UI.actions'
import { DEPTH_CHART_ZOOM } from '../../redux/constants/UI.constants'
import {
  getBookTopAsks,
  getBookTopBids,
  getBookTopPasks,
  getBookTopPbids,
  getBookTopTasks,
  getBookTopTbids,
} from '../../redux/selectors/book-top.selectors'
import {
  getBookAsks,
  getBookBids,
  getBooktAsks,
  getBooktBids,
  getBookpBids,
  getBookpAsks,
  getBookSnapshotReceived,
} from '../../redux/selectors/book.selectors'
import { getUrlPair, getUIDepthChartZoom, getUIBookPrec } from '../../redux/selectors/UI.selectors'
import { depthChart } from '../../var/config'

const DepthChartContainer = ({
  baseCcy,
  quoteCcy,
  parentWidth,
  parentHeight,
  paddingX,
  paddingY,
  ...props
}) => {
  const { symbol, dispatch } = useCommonBfxData(baseCcy, quoteCcy)

  const asks = useSelector(state => getBookAsks(state, symbol))
  const bids = useSelector(state => getBookBids(state, symbol))
  const pAsks = useSelector(state => getBookpAsks(state, symbol))
  const pBids = useSelector(state => getBookpBids(state, symbol))
  const tAsks = useSelector(state => getBooktAsks(state, symbol))
  const tBids = useSelector(state => getBooktBids(state, symbol))

  const asksTop = useSelector(state => getBookTopAsks(state, symbol))
  const bidsTop = useSelector(state => getBookTopBids(state, symbol))
  const pAsksTop = useSelector(state => getBookTopPasks(state, symbol))
  const pBidsTop = useSelector(state => getBookTopPbids(state, symbol))
  const tAsksTop = useSelector(state => getBookTopTasks(state, symbol))
  const tBidsTop = useSelector(state => getBookTopTbids(state, symbol))

  const snapshotReceived = useSelector(state => getBookSnapshotReceived(state, symbol))
  const zoom = useSelector(getUIDepthChartZoom)
  const prec = useSelector(getUIBookPrec)
  const currentPair = useSelector(getUrlPair)

  const updateZoom = (value) => {
    dispatch(set({
      section: DEPTH_CHART_ZOOM,
      value: Math.min(Math.max(depthChart.MIN_ZOOM, zoom + value), depthChart.MAX_ZOOM),
    }))
  }

  return (
    <DepthChart
      theme='light-theme'
      width={parentWidth - paddingX * 2}
      height={parentHeight - paddingY * 2}
      asks={asks}
      bids={bids}
      tAsks={tAsks}
      tBids={tBids}
      pAsks={pAsks}
      pBids={pBids}
      asksTop={asksTop}
      bidsTop={bidsTop}
      pAsksTop={pAsksTop}
      pBidsTop={pBidsTop}
      tAsksTop={tAsksTop}
      tBidsTop={tBidsTop}
      loading={!snapshotReceived}
      zoom={zoom}
      prec={prec}
      updateZoom={updateZoom}
      fontFamily='"Source Sans Pro"'
      currentPair={currentPair}
      {...props}
    />
  )
}

DepthChartContainer.propTypes = PROP_DEFAULT_CCYS.props

DepthChartContainer.defaultProps = PROP_DEFAULT_CCYS.defaults

export default memo(DepthChartContainer)
