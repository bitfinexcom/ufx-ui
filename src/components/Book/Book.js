import cx from 'classnames'
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
import withResponsive from '../../hoc/withResponsive'
import { getVisibleColumns } from '../../utils/data-mapping'
import { ResponsiveState } from '../Responsive'
import Spinner from '../ui/Spinner'
import getColumns from './Book.columns'
import {
  BREAKPOINT_VERTICAL, BOOK_VIZ_TYPES, DISPLAYED_ROWS, DEFAULT_ZOOM,
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
    parentWidth,
    zoom,
    bookViz,
    rowMapping,
    isStackedView,
    numberOfRows,
  } = props
  const { t } = useTranslation()
  const { width } = ResponsiveState()
  const isVertical = _isBoolean(isStackedView) ? isStackedView : (parentWidth || width) < BREAKPOINT_VERTICAL
  const [oBids, oAsks] = _partition(orders, (o) => o.amount > 0)

  const decimals = useMemo(
    () => getDecimals({ ...bids, ...asks }),
    [bids, asks],
  )

  const columns = useMemo(() => getVisibleColumns(getColumns({ t }), rowMapping), [rowMapping, t])

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
   * whether to show offline message
   */
  online: PropTypes.bool,
  /**
   * whether to show loading indicator
   */
  loading: PropTypes.bool,
  /**
   * data to show on asks side
   */
  asks: PropTypes.objectOf(PropTypes.shape(PROP_BOOK)),
  /**
   * data to show on bids side
   */
  bids: PropTypes.objectOf(PropTypes.shape(PROP_BOOK)),
  /**
   * asks data with 'total' field that is cumulative sum of amount
   */
  tAsks: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.shape(PROP_BOOK_TRADE), PropTypes.number])),
  /**
   * bids data with 'total' field that is cumulative sum of amount
   */
  tBids: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.shape(PROP_BOOK_TRADE), PropTypes.number])),
  /**
   * sorted price list to show on asks side
   */
  pAsks: PropTypes.arrayOf(PropTypes.number),
  /**
   * sorted price list to show on bids side
   */
  pBids: PropTypes.arrayOf(PropTypes.number),
  /**
   * list of open orders
   */
  orders: PropTypes.arrayOf(PropTypes.shape(PROP_ORDER)),
  /**
   * fn to call when an open order is closed
   */
  cancelOrder: PropTypes.func,
  /**
   * fn to call when a book row is clicked
   */
  onRowClick: PropTypes.func,
  /**
   * for css customization
   */
  className: PropTypes.string,
  parentWidth: PropTypes.number,
  /**
   * zoom level for bar graph
   */
  zoom: PropTypes.number,
  /**
   * visualisation type for bar graph: <br/>
   * 'cumulative': bar graph for 'total' field<br/>
   * 'amount': bar graph for 'amount' field
   */
  bookViz: PropTypes.oneOf(Object.values(BOOK_VIZ_TYPES)),
  /**
   * field/column mapping for asks/bids data
   */
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  /**
   * whether to show stacked layout for bids and asks side
   */
  isStackedView: PropTypes.bool,
  /**
   * number of book rows to display<br/>
   */
  numberOfRows: PropTypes.number,
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
  parentWidth: null,
  zoom: DEFAULT_ZOOM,
  bookViz: BOOK_VIZ_TYPES.CUMULATIVE,
  rowMapping: {},
  // keep default as undefined so by default, layout will auto switch between stacked/non-stacked views
  isStackedView: undefined,
  numberOfRows: DISPLAYED_ROWS,
}

Book.defaultProps = defaultProps

export default withI18nProvider(withResponsive(memo(Book)))
