import { getMappedKey } from '@ufx-ui/utils'
import cx from 'classnames'
import _filter from 'lodash/filter'
import _includes from 'lodash/includes'
import _toLower from 'lodash/toLower'
import PropTypes from 'prop-types'
import React, { useState, memo } from 'react'
import { useTranslation } from 'react-i18next'

import getColumns from './Balances.columns'
import { KEYS } from './Balances.constants'
import { balancesAdapter, sortData } from './Balances.helpers'
import BalancesToolbar from './Balances.Toolbar'
import * as Classes from '../../common/classes'
import { DATA_MAPPING } from '../../common/props'
import withI18nProvider from '../../hoc/withI18nProvider'
import withResponsive from '../../hoc/withResponsive'
import useSortableData from '../../hooks/useSortableData'
import { getVirtualTableColumns } from '../helper'
import { VirtualTable } from '../ui'

const ROW_HEIGHT = 42

const noRowsRenderer = (t) => () => (
  <div className='empty'>
    <small>{t('common:no_results_found')}</small>
  </div>
)

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
  const columns = getVirtualTableColumns(
    getColumns,
    { showTransfer, handleDepositClick, handleWithdrawClick },
    rowMapping,
  )

  const keyForExchange = getMappedKey(KEYS.EXCHANGE, rowMapping)

  const { data = [] } = useSortableData(
    balancesAdapter(balances),
    { key: keyForExchange },
    sortData,
  )

  const filtered = _filter(data, ({ name } = {}) => _includes(_toLower(name), _toLower(searchTerm)))

  return (
    <div className={cx(Classes.BALANCES, className)}>
      <BalancesToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        hideSmallBalances={hideSmallBalances}
        setHideSmallBalances={setHideSmallBalances}
        smallBalanceThreshold={smallBalanceThreshold}
      />

      <VirtualTable
        interactive
        striped
        columns={columns}
        data={filtered}
        defaultSortBy={KEYS.EXCHANGE}
        defaultSortDirection='DESC'
        rowHeight={ROW_HEIGHT}
        noRowsRenderer={noRowsRenderer(t)}
      />
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
