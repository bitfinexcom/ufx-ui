import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import { getCurrentStyle, THEMES } from '../../common/themes'
import withI18nProvider from '../../hoc/withI18nProvider'
import { PROP_BOOK_TRADE, PROP_BOOK } from '../Book/Book.props'
import Spinner from '../ui/Spinner'
import DepthChartCanvas from './DepthChart.canvas'

export const DepthChart = ({
  asks,
  bids,
  tAsks,
  tBids,
  pAsks,
  pBids,
  asksTop,
  bidsTop,
  tAsksTop,
  tBidsTop,
  pAsksTop,
  pBidsTop,
  className,
  loading,
  theme,
  width,
  height,
  zoom,
  prec,
  updateZoom,
  fontFamily,
  currentPair,
}) => {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)
  const { t } = useTranslation()
  const classes = cx(Classes.DEPTH_CHART, className)
  const { depthChart: depthChartStyle } = getCurrentStyle(theme)

  useEffect(() => {
    // when the width/height changes (due to resizing) unset charts so that
    // they will be re-instantiated with the new width/height in the other
    // useEffect block. Do the same when disconnected/loading
    chartRef.current = null
  }, [width, height, currentPair, prec])

  useEffect(() => {
    if (!canvasRef.current || !pBidsTop.length || !pAsksTop.length) return

    if (!chartRef.current) {
      chartRef.current = new DepthChartCanvas({
        ref: canvasRef.current,
        bidsColor: depthChartStyle.bidsColor,
        asksColor: depthChartStyle.asksColor,
        bgColor: depthChartStyle.bgColor,
        axisColor: depthChartStyle.axisColor,
        fontColor: depthChartStyle.fontColor,
        highlightColor: depthChartStyle.highlightColor,
        initialZoom: zoom,
        fontFamily,
        onScroll: event => {
          updateZoom((event.deltaY * 0.02))
        },
      })
    }

    chartRef.current.render({
      bids,
      tBids,
      pBids,
      asks,
      tAsks,
      pAsks,
      bidsTop,
      tBidsTop,
      pBidsTop,
      asksTop,
      tAsksTop,
      pAsksTop,
      zoom,
    })
  }, [bids, tBids, pBids, asks, tAsks, pAsks, bidsTop, tBidsTop, pBidsTop, asksTop, tAsksTop, pAsksTop, depthChartStyle, zoom, updateZoom, fontFamily])

  if (loading) {
    return (
      <div className={`${Classes.DEPTH_CHART}__error`}>
        {loading && (
          <Spinner />
        )}
      </div>
    )
  }

  if (!(pBidsTop.length > 2 && pAsksTop.length > 2)) {
    return <div className='side-message'>{t('common:no_data_available')}</div>
  }

  return (
    <div className={classes}>
      <canvas ref={canvasRef} className='canvas' width={width || undefined} height={height || undefined} />
    </div>
  )
}

DepthChart.propTypes = {
  /**
   *If true, showing loader
   */
  loading: PropTypes.bool,
  /**
   * The data to show on asks side.
   */
  asks: PropTypes.objectOf(PropTypes.shape(PROP_BOOK)),
  /**
   * The data to show on bids side.
   */
  bids: PropTypes.objectOf(PropTypes.shape(PROP_BOOK)),
  /**
   * The asks data with 'total' field that is cumulative sum of amount.
   */
  tAsks: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.shape(PROP_BOOK_TRADE), PropTypes.number]),
  ).isRequired,
  /**
   * The bids data with 'total' field that is cumulative sum of amount.
   */
  tBids: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.shape(PROP_BOOK_TRADE), PropTypes.number]),
  ).isRequired,
  /**
   * The sorted price list to show on asks side.
   */
  pAsks: PropTypes.arrayOf(PropTypes.number).isRequired,
  /**
   * The sorted price list to show on bids side.
   */
  pBids: PropTypes.arrayOf(PropTypes.number).isRequired,
  /**
   * The book data that includes the lowest cluster of ask orders
   */
  asksTop: PropTypes.objectOf(PropTypes.shape(PROP_BOOK)),
  /**
   * The book data that includes the highest cluster of bid orders
   */
  bidsTop: PropTypes.objectOf(PropTypes.shape(PROP_BOOK)),
  /**
   * The book data that includes the lowest cluster of ask orders with 'total' field
   */
  tAsksTop: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.shape(PROP_BOOK_TRADE), PropTypes.number]),
  ).isRequired,
  /**
   * The book data that includes the highest cluster of bid orders with 'total' field
   */
  tBidsTop: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.shape(PROP_BOOK_TRADE), PropTypes.number]),
  ).isRequired,
  /**
   * The sorted lowest price to show on asks side
   */
  pAsksTop: PropTypes.arrayOf(PropTypes.number).isRequired,
  /**
   * The sorted highest price to show on bids side
   */
  pBidsTop: PropTypes.arrayOf(PropTypes.number).isRequired,
  /**
   * The className of the Book’s outer element.
   */
  className: PropTypes.string,
  /**
   * One of available themes
   */
  theme: PropTypes.string,
  /**
   * Width of Chart, in px
   */
  width: PropTypes.number,
  /**
   * Height of Chart, in px
   */
  height: PropTypes.number,
  /**
   * The zoom level for bar graph.
   */
  zoom: PropTypes.number,
  /**
   * The precision level of Chart
   */
  prec: PropTypes.number,
  /**
   * Callback, invoked when user change zoom slider
   */
  updateZoom: PropTypes.func.isRequired,
  /**
   * Font, using for Chart texts
   */
  fontFamily: PropTypes.string,
  /**
   * Current currency pair
   */
  currentPair: PropTypes.string.isRequired,
}

export const defaultProps = {
  asks: {},
  bids: {},
  asksTop: {},
  bidsTop: {},
  loading: false,
  className: null,
  theme: THEMES.DARK_THEME,
  width: 600,
  height: 220,
  zoom: 50,
  prec: 1,
  fontFamily: '"Helvetica Neue"',
}

DepthChart.defaultProps = defaultProps

export default withI18nProvider(memo(DepthChart))
