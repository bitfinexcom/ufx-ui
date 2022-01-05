import cx from 'classnames'
import compose from 'lodash/fp/compose'
import _isBoolean from 'lodash/isBoolean'
import _partition from 'lodash/partition'
import _take from 'lodash/take'
import memoizeOne from 'memoize-one'
import PropTypes from 'prop-types'
import React, { useMemo, memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import { DATA_MAPPING } from '../../common/props'
import withI18nProvider from '../../hoc/withI18nProvider'
import withMobileLayout from '../../hoc/withMobileLayout'
import withResponsive from '../../hoc/withResponsive'
import { getVirtualTableColumns } from '../helper'
import Spinner from '../ui/Spinner'
import getColumns from './Book.columns'
import {
  BOOK_VIZ_TYPES, DISPLAYED_ROWS, DEFAULT_ZOOM,
} from './Book.constants'
import { getBookAmountMax, getBooktMax, getDecimals } from './Book.helpers'
import { PROP_BOOK_TRADE, PROP_BOOK, PROP_ORDER } from './Book.props'
import BookSide from './Book.Side'
import Spread from './Book.Spread'

export const Book = (props) => {
  const {
    online,
    loading,
    asks,
    bids,
    tAsks,
    tBids,
    pAsks: _pAsks,
    pBids: _pBids,
    orders,
    cancelOrder,
    onRowClick,
    className,
    zoom,
    bookViz,
    rowMapping,
    isStackedView,
    isMobileLayout,
    numberOfRows,
  } = props
  const { t } = useTranslation()
  const isVertical = _isBoolean(isStackedView) ? isStackedView : isMobileLayout
  const [oBids, oAsks] = _partition(orders, (o) => o.amount > 0)

  const decimals = useMemo(
    () => getDecimals({ ...bids, ...asks }),
    [bids, asks],
  )

  const columns = getVirtualTableColumns(
    getColumns,
    { t },
    rowMapping,
  )

  const classes = cx(Classes.BOOK, className)

  if (!online || loading) {
    return (
      <div className={`${Classes.BOOK}__error`}>
        {loading
          ? <Spinner />
          : <small>{t('common:websocket_offiline')}</small>}
      </div>
    )
  }

  const getPsnap = memoizeOne(psnap => _take(psnap, numberOfRows))
  const pAsks = getPsnap(_pAsks)
  const pBids = getPsnap(_pBids)
  const amountMax = getBookAmountMax(asks, bids, pAsks, pBids)
  const totalMax = getBooktMax(pAsks, pBids, tAsks, tBids)

  const commonProps = {
    decimals,
    totalMax,
    amountMax,
    cancelOrder,
    onRowClick,
    isVertical,
    zoom,
    bookViz,
    columns,
    rowMapping,
    numberOfRows,
  }

  return (
    <div className={classes}>
      <div className={cx('main', {
        vertical: isVertical,
      })}
      >
        <BookSide
          data={bids}
          psnap={pBids}
          totals={tBids}
          orders={oBids}
          isBid
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...commonProps}
        />
        {isVertical && (
          <Spread
            tBids={tBids}
            tAsks={tAsks}
            pBids={pBids}
            pAsks={pAsks}
            decimals={decimals}
            columns={columns}
            rowMapping={rowMapping}
          />
        )}
        <BookSide
          data={asks}
          psnap={pAsks}
          totals={tAsks}
          orders={oAsks}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...commonProps}
        />
      </div>
    </div>
  )
}

Book.propTypes = {
  /**
   * If false, show the offline message.
   */
  online: PropTypes.bool,
  /**
   * If true, show the loading message.
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
  tAsks: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.shape(PROP_BOOK_TRADE), PropTypes.number])),
  /**
   * The bids data with 'total' field that is cumulative sum of amount.
   */
  tBids: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.shape(PROP_BOOK_TRADE), PropTypes.number])),
  /**
   * The sorted price list to show on asks side.
   */
  pAsks: PropTypes.arrayOf(PropTypes.number),
  /**
   * The sorted price list to show on bids side.
   */
  pBids: PropTypes.arrayOf(PropTypes.number),
  /**
   * The list of open orders.
   */
  orders: PropTypes.arrayOf(PropTypes.shape(PROP_ORDER)),
  /**
   * The function called when an open order is closed.
   */
  cancelOrder: PropTypes.func,
  /**
   * The function called when a book row is clicked.
   */
  onRowClick: PropTypes.func,
  /**
   * The className of the Book’s outer element.
   */
  className: PropTypes.string,
  /**
   * The zoom level for bar graph.
   */
  zoom: PropTypes.number,
  /**
   * The visualisation type for bar graph: <br/>
   * 'cumulative': bar graph for 'total' field<br/>
   * 'amount': bar graph for 'amount' field
   */
  bookViz: PropTypes.oneOf(Object.values(BOOK_VIZ_TYPES)),
  /**
   * The custom field/column mapping for the data.
   */
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  /**
   * If true, show the Book in a vertically stacked layout for bids and asks side.
   */
  isStackedView: PropTypes.bool,
  /**
   * The number of book rows to display.
   */
  numberOfRows: PropTypes.number,
  isMobileLayout: PropTypes.bool,
}

export const defaultProps = {
  online: false,
  loading: false,
  asks: {},
  bids: {},
  tAsks: {},
  tBids: {},
  pAsks: [],
  pBids: [],
  orders: [],
  cancelOrder: () => { },
  onRowClick: () => { },
  className: null,
  zoom: DEFAULT_ZOOM,
  bookViz: BOOK_VIZ_TYPES.CUMULATIVE,
  rowMapping: {},
  // keep default as undefined so by default, layout will auto switch between stacked/non-stacked views
  isStackedView: undefined,
  numberOfRows: DISPLAYED_ROWS,
  isMobileLayout: undefined,
}

Book.defaultProps = defaultProps

export default compose(
  withI18nProvider,
  withResponsive,
  withMobileLayout(),
  memo,
)(Book)
