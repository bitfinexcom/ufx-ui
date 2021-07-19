import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import React from 'react'

import * as Classes from '../../common/classes'
import { getDefaultCellRenderer } from '../helper'
import { Tooltip, Truncate } from '../ui'
import { KEYS, getStyles } from './OrderHistory.constants'

// label: column header
// datadataKey: represents data in table cell
// headerStyle : style for table header-cell
// style : style for table row-cell
// headerRenderer: renderer for table header-cell
// renderer: renderer for table row-cell
const getColumns = (args = {}) => {
  const { t, isMobile, getDisplayValue } = args

  const styles = getStyles(isMobile)

  return [
    {
      dataKey: KEYS.ID,
      label: '',
      headerStyle: styles.ID,
      style: styles.ID,
      headerClassName: 'intent',
      className: 'intent',
      renderer: ({ rowData }) => {
        const id = getDisplayValue(rowData)(KEYS.ID)

        const amount = getDisplayValue(rowData)(KEYS.AMOUNT, false)
        const isSellOrder = amount < 0
        const orderTitle = isSellOrder
          ? t('sell_order_title', { id })
          : t('buy_order_title', { id })

        const colorClass = Classes.getColors(amount, { strike: 0, includeStrike: true })

        if (isMobile) {
          return <span className={isSellOrder ? 'sell' : 'buy'} />
        }

        return (
          <Tooltip content={orderTitle} persistent>
            <FontAwesomeIcon
              icon={faCircle}
              className={colorClass}
              size='sm'
            />
          </Tooltip>
        )
      },
    },
    {
      dataKey: KEYS.PAIR,
      label: t('pair'),
      headerStyle: styles.PAIR,
      style: styles.PAIR,
      headerClassName: 'pair',
      className: 'pair',
      renderer: ({ rowData, dataKey }) => {
        const formattedValue = getDisplayValue(rowData)(dataKey)
        const type = getDisplayValue(rowData)(KEYS.TYPE)

        return (
          <div>
            <Truncate><span>{formattedValue}</span></Truncate>
            {isMobile && (
              <span className='mobile-order-type'>
                {type}
              </span>
            )}
          </div>
        )
      },
    },
    ...(isMobile ? [] : [
      {
        dataKey: KEYS.TYPE,
        label: t('type'),
        headerStyle: styles.TYPE,
        style: styles.TYPE,
        // dont truncate TYPE to avoid showing two tooltips on hover
        renderer: getDefaultCellRenderer(getDisplayValue, false),
      },
    ]),
    {
      dataKey: KEYS.AMOUNT,
      label: t('amount'),
      headerStyle: styles.AMOUNT,
      style: styles.AMOUNT,
      headerClassName: Classes.RIGHT_TO_LEFT,
      className: cx(Classes.RIGHT_TO_LEFT, 'is-monospaced'),
      renderer: getDefaultCellRenderer(getDisplayValue),
    },
    {
      dataKey: KEYS.BASE_CCY,
      label: t('ccy'),
      headerStyle: styles.CCY,
      style: styles.CCY,
      headerClassName: Classes.CENTER,
      className: Classes.CENTER,
      renderer: getDefaultCellRenderer(getDisplayValue),
    },
    {
      dataKey: KEYS.PRICE,
      label: t('price'),
      headerStyle: styles.PRICE,
      style: styles.PRICE,
      headerClassName: Classes.RIGHT_TO_LEFT,
      className: cx(Classes.RIGHT_TO_LEFT, 'is-monospaced'),
      renderer: getDefaultCellRenderer(getDisplayValue),
    },
    {
      dataKey: KEYS.PRICE_AVERAGE,
      label: t('average_price'),
      headerStyle: styles.PRICE_AVERAGE,
      style: styles.PRICE_AVERAGE,
      headerClassName: Classes.RIGHT_TO_LEFT,
      className: cx(Classes.RIGHT_TO_LEFT, 'is-monospaced'),
      renderer: getDefaultCellRenderer(getDisplayValue),
    },
    {
      dataKey: KEYS.STATUS,
      label: t('status'),
      headerStyle: styles.STATUS,
      style: styles.STATUS,
      headerClassName: isMobile ? Classes.RIGHT_TO_LEFT : Classes.CENTER,
      className: cx('status', isMobile ? Classes.RIGHT_TO_LEFT : Classes.CENTER),
      renderer: ({ rowData, dataKey }) => {
        if (!isMobile) {
          return getDefaultCellRenderer(getDisplayValue)({ rowData, dataKey })
        }

        const formattedValue = getDisplayValue(rowData)(dataKey)
        const placed = getDisplayValue(rowData)(KEYS.PLACED)

        return (
          <div style={{ display: 'grid' }}>
            <Truncate><span>{formattedValue}</span></Truncate>
            <Truncate>
              <span className='mobile-order-placed'>
                {placed}
              </span>
            </Truncate>
          </div>
        )
      },
    },
    ...(isMobile ? [] : [
      {
        dataKey: KEYS.PLACED,
        label: t('placed'),
        headerStyle: styles.PLACED,
        style: styles.PLACED,
        renderer: getDefaultCellRenderer(getDisplayValue),
      },
    ]),
  ]
}

export default getColumns
