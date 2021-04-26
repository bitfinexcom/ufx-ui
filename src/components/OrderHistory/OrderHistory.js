import cx from 'classnames'
import compose from 'lodash/fp/compose'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { useMemo, memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import { DATA_MAPPING } from '../../common/props'
import withI18nProvider from '../../hoc/withI18nProvider'
import withMobileLayout from '../../hoc/withMobileLayout'
import withResponsive from '../../hoc/withResponsive'
import { getMappedKey } from '../../utils/data-mapping'
import { Table, Spinner } from '../ui'
import getColumns from './OrderHistory.columns'
import { ORDER_HISTORY_COLUMNS } from './OrderHistory.constants'
import Header from './OrderHistory.Header'
import Row from './OrderHistory.Row'

export const OrderHistory = (props) => {
  const {
    orders,
    loading,
    rowMapping,
    className,
    isMobileLayout: isMobile,
  } = props
  const { t } = useTranslation('orderhistory')
  const keyForId = getMappedKey(ORDER_HISTORY_COLUMNS.ID, rowMapping)
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
}

export const defaultProps = {
  orders: [],
  loading: false,
  rowMapping: {},
  className: null,
  isMobileLayout: undefined,
}

OrderHistory.defaultProps = defaultProps

export default compose(
  withI18nProvider,
  withResponsive,
  withMobileLayout(),
  memo,
)(OrderHistory)
