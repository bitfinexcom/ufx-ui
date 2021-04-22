import cx from 'classnames'
import { compose } from 'lodash/fp/componse'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { useMemo, memo } from 'react'
import { useTranslation } from 'react-i18next'
// import { compose } from 'react-redux'

import * as Classes from '../../common/classes'
import { DATA_MAPPING } from '../../common/props'
import withI18nProvider from '../../hoc/withI18nProvider'
import withMobileLayout from '../../hoc/withMobileLayout'
import withResponsive from '../../hoc/withResponsive'
import { getMappedKey } from '../../utils/data-mapping'
import { Table, Spinner } from '../ui'
import getColumns from './Orders.columns'
import { KEYS, BREAKPOINT_SMALL } from './Orders.constants'
import OrdersHeader from './Orders.Header'
import OrderRow from './Orders.Row'

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
  const keyForId = getMappedKey(KEYS.ID, rowMapping)
  const classes = cx(Classes.ORDERS, className, {
    'mobile-table': isMobile,
  })
  const columns = useMemo(() => getColumns({ t, isMobile }), [t, isMobile])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className={classes}>
      <div className={Classes.TABLE_WRAPPER}>
        <Table condensed striped>
          <OrdersHeader columns={columns} />
          <tbody>
            {orders.map(order => (
              <OrderRow
                key={_get(order, keyForId)}
                columns={columns}
                rowMapping={rowMapping}
                data={order}
                cancelOrder={cancelOrder}
              />
            ))}
          </tbody>
        </Table>
        {orders.length === 0 && (
          <div className='empty'>
            <small>{t('no_orders')}</small>
          </div>
        )}
      </div>
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
   * the mobile layout will be enabled when the screen size is below 576.
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
  withMobileLayout(BREAKPOINT_SMALL),
  memo,
)(Orders)
