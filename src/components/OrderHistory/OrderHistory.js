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
import { ORDER_HISTORY_COLUMNS, BREAKPOINT_SMALL } from './OrderHistory.constants'
import Header from './OrderHistory.Header'
import Row from './OrderHistory.Row'

export const OrderHistory = (props) => {
  const {
    orders,
    loading,
    rowMapping,
    className,
    isMobileLayout,
  } = props
  const { t } = useTranslation('orderhistory')
  const keyForId = getMappedKey(ORDER_HISTORY_COLUMNS.ID, rowMapping)
  const { width } = ResponsiveState()
  const isMobile = isMobileLayout !== undefined ? !!isMobileLayout : width < BREAKPOINT_SMALL

  const columns = useMemo(() => getColumns({ t, isMobile }), [t, isMobile])

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
          <Header columns={columns} rowMapping={rowMapping} />
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
  orders: PropTypes.arrayOf(PropTypes.object),
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
   * A toggle to display a condensed layout for mobile
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

OrderHistory.defaultProps = defaultProps

export default withI18nProvider(withResponsive(memo(OrderHistory)))
