import { getValue } from '@ufx-ui/utils'
import cx from 'classnames'
import compose from 'lodash/fp/compose'
import PropTypes from 'prop-types'
import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import getColumns from './Orders.columns'
import { KEYS, MAPPING, MIN_TABLE_WIDTH } from './Orders.constants'
import * as Classes from '../../common/classes'
import { DATA_MAPPING } from '../../common/props'
import withI18nProvider from '../../hoc/withI18nProvider'
import withMobileLayout from '../../hoc/withMobileLayout'
import withResponsive from '../../hoc/withResponsive'
import { getVirtualTableColumns } from '../helper'
import { Spinner, VirtualTable } from '../ui'

const noRowsRenderer = (t) => () => (
  <div className='empty'>
    <small>{t('no_orders')}</small>
  </div>
)

export const Orders = (props) => {
  const {
    orders,
    loading,
    rowMapping,
    className,
    cancelOrder,
    isMobileLayout: isMobile,
  } = props
  const { t } = useTranslation('orders')

  const classes = cx(Classes.ORDERS, className)
  const getDisplayValue = useCallback(
    (rowData) => getValue({
      mapping: MAPPING,
      customMapping: rowMapping,
      data: rowData,
    }),
    [rowMapping],
  )

  const columns = getVirtualTableColumns(getColumns,
    {
      t, isMobile, cancelOrder, getDisplayValue,
    },
    rowMapping)

  if (loading) {
    return <Spinner />
  }

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
      />
    </div>
  )
}

Orders.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  className: PropTypes.string,
  cancelOrder: PropTypes.func.isRequired,
  /**
   * If true, show the Orders in a condensed mobile layout. By default
   * the mobile layout will be enabled when the screen size is below the mobile
   * breakpoint (BREAKPOINTS.SM).
   */
  isMobileLayout: PropTypes.bool,
}

export const defaultProps = {
  orders: [],
  loading: false,
  rowMapping: {},
  className: null,
  isMobileLayout: undefined,
}

Orders.defaultProps = defaultProps

export default compose(
  withI18nProvider,
  withResponsive,
  withMobileLayout(),
  memo,
)(Orders)
