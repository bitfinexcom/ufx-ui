import cx from 'classnames'
import _filter from 'lodash/filter'
import _get from 'lodash/get'
import _includes from 'lodash/includes'
import _map from 'lodash/map'
import _toLower from 'lodash/toLower'
import PropTypes from 'prop-types'
import React, { useState, memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import { DATA_MAPPING } from '../../common/props'
import withI18nProvider from '../../hoc/withI18nProvider'
import withResponsive from '../../hoc/withResponsive'
import useSortableData from '../../hooks/useSortableData'
import { getMappedKey } from '../../utils/data-mapping'
import { Table } from '../ui'
import getColumns from './Balances.columns'
import { KEYS } from './Balances.constants'
import BalancesHeader from './Balances.Header'
import { balancesAdapter, sortData } from './Balances.helpers'
import BalancesRow from './Balances.Row'
import BalancesToolbar from './Balances.Toolbar'

export const Balances = (props) => {
  const {
    balances,
    hideSmallBalances,
    setHideSmallBalances,
    rowMapping,
    smallBalanceThreshold,
    className,
    showTransfer,
    handleDepositClick,
    handleWithdrawClick,
  } = props
  const { t } = useTranslation('balances')
  const [searchTerm, setSearchTerm] = useState('')
  const columns = useMemo(() => getColumns(showTransfer), [showTransfer])

  const keyForName = getMappedKey(KEYS.NAME, rowMapping)
  const keyForExchange = getMappedKey(KEYS.EXCHANGE, rowMapping)

  const { data = [], requestSort, sortConfig } = useSortableData(
    balancesAdapter(balances),
    { key: keyForExchange },
    sortData,
  )

  const filtered = _filter(data, ({ name } = {}) => _includes(_toLower(name), _toLower(searchTerm)))

  const renderBalancesTable = () => {
    if (filtered.length === 0) {
      return (
        <div className='empty'>
          <small>{t('common:no_results_found')}</small>
        </div>
      )
    }

    return (
      <>
        <Table condensed>
          <BalancesHeader
            sortConfig={sortConfig}
            requestSort={requestSort}
            columns={columns}
          />
        </Table>
        <div className={Classes.TABLE_WRAPPER}>
          <Table condensed striped>
            <tbody>
              {_map(filtered, (row) => (
                <BalancesRow
                  key={_get(row, keyForName)}
                  data={row}
                  dataMapping={rowMapping}
                  columns={columns}
                  handleDepositClick={handleDepositClick}
                  handleWithdrawClick={handleWithdrawClick}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </>
    )
  }

  return (
    <div className={cx(Classes.BALANCES, className)}>
      <BalancesToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        hideSmallBalances={hideSmallBalances}
        setHideSmallBalances={setHideSmallBalances}
        smallBalanceThreshold={smallBalanceThreshold}
      />
      {renderBalancesTable()}
    </div>
  )
}

Balances.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  balances: PropTypes.object,
  hideSmallBalances: PropTypes.bool,
  setHideSmallBalances: PropTypes.func,
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  smallBalanceThreshold: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  showTransfer: PropTypes.bool,
  handleDepositClick: PropTypes.func,
  handleWithdrawClick: PropTypes.func,
}

export const defaultProps = {
  balances: {},
  hideSmallBalances: false,
  setHideSmallBalances: () => {},
  rowMapping: {},
  smallBalanceThreshold: 0,
  className: null,
  showTransfer: false,
  handleDepositClick: () => {},
  handleWithdrawClick: () => {},
}

Balances.defaultProps = defaultProps

export default withResponsive(withI18nProvider(memo(Balances)))
