import cx from 'classnames'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { useMemo, memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import { DATA_MAPPING } from '../../common/props'
import withI18nProvider from '../../hoc/withI18nProvider'
import { getMappedKey } from '../../utils/data-mapping'
import { Table, Spinner } from '../ui'
import getColumns from './OrderHistory.columns'
// import KEYS as ORDER_HISTORY_COLUMNS for storybook props-table documentation
import { KEYS as ORDER_HISTORY_COLUMNS } from './OrderHistory.constants'
import Header from './OrderHistory.Header'
import Row from './OrderHistory.Row'

export const OrderHistory = (props) => {
  const {
    orders,
    loading,
    rowMapping,
    className,
    columns: columnsKeys,
    isMobileLayout,
  } = props
  const { t } = useTranslation('orderhistory')
  const keyForId = getMappedKey(ORDER_HISTORY_COLUMNS.ID, rowMapping)

  const columns = useMemo(() => getColumns({ t, isMobileLayout, columnsKeys }), [t, isMobileLayout, columnsKeys])

  if (loading) {
    return <Spinner />
  }

  const classes = cx(Classes.ORDER_HISTORY, className, {
    'mobile-table': isMobileLayout,
  })

  return (
    <div className={classes}>
      <div className={Classes.TABLE_WRAPPER}>
        <Table condensed striped>
          <Header columns={columns} />
          <tbody>
            {orders.map((order) => (
              <Row
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
  /**
   * The orders to be displayed in the component
   */
  orders: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    cid: PropTypes.number,
    created: PropTypes.number,
    gid: PropTypes.number,
    id: PropTypes.number,
    originalAmount: PropTypes.number,
    price: PropTypes.number,
    status: PropTypes.string,
    symbol: PropTypes.string,
    type: PropTypes.string,
  })),
  /**
   * A toggle to display a loading indicator
   */
  loading: PropTypes.bool,
  /**
   * Custom mapping of the row’s column
   */
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  /**
   * The classname of the component
   */
  className: PropTypes.string,
  /**
   * Optional prop to customize the columns of the component
   */
  columns: PropTypes.arrayOf(PropTypes.oneOf(Object.values(ORDER_HISTORY_COLUMNS))),
  /**
   * A toggle to display a condensed layout for mobile
   */
  isMobileLayout: PropTypes.bool,
}

export const defaultProps = {
  orders: [],
  loading: false,
  rowMapping: {},
  className: null,
  columns: Object.values(ORDER_HISTORY_COLUMNS),
  isMobileLayout: false,
}

OrderHistory.defaultProps = defaultProps

export default withI18nProvider(memo(OrderHistory))
