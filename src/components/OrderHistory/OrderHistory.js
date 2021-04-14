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
import getColumns from './OrderHistory.columns'
// import KEYS as ORDER_HISTORY_COLUMNS for storybook props-table documentation
import { KEYS as ORDER_HISTORY_COLUMNS, BREAKPOINT_SMALL } from './OrderHistory.constants'
import OrderHHeader from './OrderHistory.Header'
import OrderHRow from './OrderHistory.Row'

export const OrderHistory = (props) => {
  const {
    orders,
    loading,
    rowMapping,
    className,
    parentWidth,
    columns: columnsKeys,
  } = props
  const { t } = useTranslation('orderhistory')
  const { width } = ResponsiveState()
  const isMobile = (parentWidth || width) < BREAKPOINT_SMALL
  const keyForId = getMappedKey(ORDER_HISTORY_COLUMNS.ID, rowMapping)

  const columns = useMemo(() => getColumns({ t, isMobile, columnsKeys }), [t, isMobile, columnsKeys])

  if (loading) {
    return <Spinner />
  }

  const classes = cx(Classes.ORDER_HISTORY, className, {
    'mobile-table': isMobile,
  })

  return (
    <div className={classes}>
      <div className={Classes.TABLE_WRAPPER}>
        <Table condensed striped>
          <OrderHHeader columns={columns} />
          <tbody>
            {orders.map((order) => (
              <OrderHRow
                key={_get(order, keyForId)}
                columns={columns}
                rowMapping={rowMapping}
                data={order}
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

OrderHistory.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  className: PropTypes.string,
  parentWidth: PropTypes.number,
  columns: PropTypes.arrayOf(PropTypes.oneOf(Object.values(ORDER_HISTORY_COLUMNS))),
}

export const defaultProps = {
  orders: [],
  loading: false,
  rowMapping: {},
  className: null,
  parentWidth: null,
  columns: Object.values(ORDER_HISTORY_COLUMNS),
}

OrderHistory.defaultProps = defaultProps

// export default withI18nProvider(withResponsive(memo(OrderHistory)))
export default withResponsive(memo(OrderHistory))
