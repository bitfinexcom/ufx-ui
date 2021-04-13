import cx from 'classnames'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { useMemo, memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import { DATA_MAPPING } from '../../common/props'
import withI18nProvider from '../../hoc/withI18nProvider'
import withResponsive from '../../hoc/withResponsive'
import { getMappedKey } from '../../utils/data-mapping'
import { ResponsiveState } from '../Responsive'
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
    parentWidth,
  } = props
  const { t } = useTranslation('orders')
  const { width } = ResponsiveState()
  const isMobile = (parentWidth || width) < BREAKPOINT_SMALL
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
  parentWidth: PropTypes.number,
}

export const defaultProps = {
  orders: [],
  loading: false,
  rowMapping: {},
  className: null,
  parentWidth: null,
}

Orders.defaultProps = defaultProps

export default withI18nProvider(withResponsive(memo(Orders)))
