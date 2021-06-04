import { groupPrices } from '@ufx-ui/utils'
import PropTypes from 'prop-types'
import React, { useMemo, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { DATA_MAPPING } from '../../common/props'
import Bars from './Book.Bars'
import { BOOK_VIZ_TYPES } from './Book.constants'
import { PROP_ORDER, PROP_BOOK, PROP_BOOK_TRADE } from './Book.props'
import Row from './Book.Row'
import SideHeader from './Book.SideHeader'

const BookSide = (props) => {
  const {
    data,
    psnap,
    totals,
    orders,
    totalMax,
    amountMax,
    decimals,
    isBid,
    cancelOrder,
    onRowClick,
    isVertical,
    zoom,
    bookViz,
    columns,
    rowMapping,
  } = props
  const { t: trans } = useTranslation('book')

  const marks = useMemo(() => groupPrices({
    psnap,
    isBid,
    list: orders,
    prop: 'price',
  }), [psnap, orders, isBid])

  const id = isBid ? 'bids' : 'asks'

  const s = {
    flexDirection: (isVertical && !isBid) ? 'column-reverse' : 'column',
  }

  const content = (
    <>
      <div className='bars'>
        <Bars
          psnap={psnap}
          totals={totals}
          totalMax={totalMax}
          amountMax={amountMax}
          isBid={isBid}
          zoom={zoom}
          bookViz={bookViz}
          isVertical={isVertical}
        />
      </div>
      <div className='rows' style={s}>
        {psnap.map((value) => {
          const r = data[value] || {}
          const t = totals[value] || {}

          return (
            <Row
              key={`${id}-${value}`}
              total={t.total}
              isBid={isBid}
              decimals={decimals}
              marks={marks}
              cancelOrder={cancelOrder}
              onRowClick={onRowClick}
              isVertical={isVertical}
              data={r}
              rowMapping={rowMapping}
              columns={columns}
            />
          )
        })}
      </div>
    </>
  )

  return (
    <div
      key={id}
      className='side'
    >
      <SideHeader
        isBid={isBid}
        isVertical={isVertical}
        columns={columns}
      />

      {psnap.length
        ? content
        : (
          <div className='side-message'>
            {trans('common:no_data_available')}
          </div>
        )}
    </div>
  )
}

BookSide.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape(PROP_BOOK)),
  psnap: PropTypes.arrayOf(PropTypes.number),
  totals: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.shape(PROP_BOOK_TRADE), PropTypes.number])),
  orders: PropTypes.arrayOf(PropTypes.shape(PROP_ORDER)),
  totalMax: PropTypes.number,
  amountMax: PropTypes.number,
  decimals: PropTypes.number.isRequired,
  isBid: PropTypes.bool,
  cancelOrder: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  isVertical: PropTypes.bool,
  zoom: PropTypes.number.isRequired,
  bookViz: PropTypes.oneOf(Object.values(BOOK_VIZ_TYPES)).isRequired,
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
}

BookSide.defaultProps = {
  data: {},
  psnap: [],
  totals: {},
  orders: [],
  totalMax: null,
  amountMax: null,
  isBid: false,
  isVertical: false,
}

export default memo(BookSide)
