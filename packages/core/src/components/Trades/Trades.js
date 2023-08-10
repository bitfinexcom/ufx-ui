import { getMappedKey } from '@ufx-ui/utils'
import cx from 'classnames'
import _get from 'lodash/get'
import _isDate from 'lodash/isDate'
import _isEmpty from 'lodash/isEmpty'
import _isString from 'lodash/isString'
import _orderBy from 'lodash/orderBy'
import _slice from 'lodash/slice'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import getColumns from './Trades.columns'
import { KEYS } from './Trades.constants'
import TradesHeader from './Trades.Header'
import { groupByDate } from './Trades.helpers'
import TradesRow from './Trades.Row'
import * as Classes from '../../common/classes'
import * as Props from '../../common/props'
import { DATA_MAPPING } from '../../common/props'
import withI18nProvider from '../../hoc/withI18nProvider'
import { useStore } from '../../store'
import { PrettyDate } from '../format'
import { getVirtualTableColumns } from '../helper'
import { Table, Spinner } from '../ui'

const {
  TRADE_TYPES,
  TRADE_TYPES_ARR,
  TRADE_PAGE_SIZE,
} = Props

export const Trades = (props) => {
  const {
    online,
    user,
    market,
    showType,
    loading,
    pageSize,
    className,
    rowMapping,
    minOrderSize,
  } = props
  const classes = cx(Classes.TRADES, className)
  const { t } = useTranslation()
  const { timezoneOffset } = useStore()

  const isMarketTrades = showType === TRADE_TYPES.MARKET

  const mtsKey = getMappedKey(KEYS.MTS, rowMapping)

  const columns = getVirtualTableColumns(
    getColumns,
    { t },
    rowMapping,
  )

  const getTradesData = (data) => {
    const orderedData = _orderBy(data, mtsKey, 'desc')
    const slicedData = _slice(orderedData, 0, pageSize)
    const groupedData = groupByDate(slicedData, mtsKey, timezoneOffset)

    return groupedData
  }

  const noTrades = (isMarketTrades)
    ? _isEmpty(market)
    : _isEmpty(user)

  const trades = (isMarketTrades)
    ? getTradesData(market)
    : getTradesData(user)

  if (loading) {
    return <Spinner />
  }

  if (!online || noTrades) {
    return (
      <div className={`${Classes.TRADES}__error`}>
        <small>
          {online
            ? (noTrades && t('common:no_data_available'))
            : t('common:websocket_offiline')}
        </small>
      </div>
    )
  }

  const keyForId = getMappedKey(KEYS.ID, rowMapping)

  return (
    <div className={classes}>
      <Table condensed>
        <TradesHeader columns={columns} />
      </Table>
      <div className={Classes.TABLE_WRAPPER}>
        <Table condensed>
          <tbody>
            {trades.map((trade, index) => {
            // handle date row for grouped user trades
              if (_isString(trade) || _isDate(trade)) {
                const nextRow = trades[index + 1] || {}
                const mts = nextRow[mtsKey] || new Date(trade).getTime()

                return (
                  <tr key={mts}>
                    <td colSpan={4} className={Classes.CENTER}>
                      <PrettyDate mts={mts} />
                    </td>
                  </tr>
                )
              }
              return (
                <TradesRow
                  key={_get(trade, keyForId)}
                  columns={columns}
                  rowMapping={rowMapping}
                  data={trade}
                  minOrderSize={minOrderSize}
                />
              )
            })}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

Trades.propTypes = {
  online: PropTypes.bool,
  loading: PropTypes.bool,
  showType: PropTypes.oneOf(TRADE_TYPES_ARR),
  pageSize: PropTypes.number,
  market: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.object), PropTypes.arrayOf(PropTypes.object)]),
  user: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.object), PropTypes.arrayOf(PropTypes.object)]),
  className: PropTypes.string,
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  minOrderSize: PropTypes.number,
}

export const defaultProps = {
  online: false,
  loading: false,
  showType: TRADE_TYPES.MARKET,
  pageSize: TRADE_PAGE_SIZE,
  market: {},
  user: {},
  className: null,
  rowMapping: {},
  minOrderSize: 0.001,
}

Trades.defaultProps = defaultProps

export default withI18nProvider(memo(Trades))
