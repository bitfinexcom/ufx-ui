import { getValue } from '@ufx-ui/utils'
import cx from 'classnames'
import compose from 'lodash/fp/compose'
import PropTypes from 'prop-types'
import React, { useCallback, memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import { DATA_MAPPING } from '../../common/props'
import withI18nProvider from '../../hoc/withI18nProvider'
import withMobileLayout from '../../hoc/withMobileLayout'
import withResponsive from '../../hoc/withResponsive'
import { getVirtualTableColumns } from '../helper'
import { VirtualTable, Spinner } from '../ui'
import getColumns from './OrderHistory.columns'
import { KEYS, MAPPING, MIN_TABLE_WIDTH } from './OrderHistory.constants'

const noRowsRenderer = (t) => () => (
  <div className='empty'>
    <small>{t('no_orders')}</small>
  </div>
)

export const OrderHistory = (props) => {
  const {
    orders,
    loading,
    rowMapping,
    className,
    isMobileLayout: isMobile,
    loadMoreRows,
  } = props
  const { t } = useTranslation('orderhistory')

  const getDisplayValue = useCallback(
    (rowData) => getValue({
      mapping: MAPPING,
      customMapping: rowMapping,
      data: rowData,
    }),
    [rowMapping],
  )

  const columns = getVirtualTableColumns(
    getColumns,
    { t, isMobile, getDisplayValue },
    rowMapping,
  )

  if (loading) {
    return <Spinner />
  }

  const classes = cx(Classes.ORDER_HISTORY, className)

  return (
    <div className={classes}>
      <VirtualTable
        columns={columns}
        data={orders}
        // give default key, dont give customised key
        defaultSortBy={KEYS.PLACED}
        defaultSortDirection='DESC'
        rowHeight={isMobile ? 46 : 34}
        striped
        noRowsRenderer={noRowsRenderer(t)}
        minTableWidth={MIN_TABLE_WIDTH}
        onScrollToBottom={loadMoreRows}
      />
    </div>
  )
}

OrderHistory.propTypes = {
  /**
   * The orders to be displayed in the OrderHistory’s component.
   */
  orders: PropTypes.arrayOf(PropTypes.object),
  /**
   * If true, show the loading message.
   */
  loading: PropTypes.bool,
  /**
   * The custom field/column mapping for the data.
   */
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  /**
   * The className of the OrderHistory’s outer element.
   */
  className: PropTypes.string,
  /**
   * If true, show the OrderHistory in a condensed mobile layout. By default
   * the mobile layout will be enabled when the screen size is below the mobile
   * breakpoint (BREAKPOINTS.SM).
   */
  isMobileLayout: PropTypes.bool,
  loadMoreRows: PropTypes.func,
}

export const defaultProps = {
  orders: [],
  loading: false,
  rowMapping: {},
  className: null,
  isMobileLayout: undefined,
  loadMoreRows: () => {},
}

OrderHistory.defaultProps = defaultProps

export default compose(
  withI18nProvider,
  withResponsive,
  withMobileLayout(),
  memo,
)(OrderHistory)
