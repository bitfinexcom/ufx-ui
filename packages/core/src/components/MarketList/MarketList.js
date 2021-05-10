import { getMappingForKey, getValue } from '@ufx-ui/utils'
import compose from 'lodash/fp/compose'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, {
  useReducer, useMemo, useCallback, memo,
} from 'react'
import { useTranslation } from 'react-i18next'

import { BREAKPOINTS } from '../../common/classes'
import * as Classes from '../../common/classes'
import { DATA_MAPPING } from '../../common/props'
import withI18nProvider from '../../hoc/withI18nProvider'
import withMobileLayout from '../../hoc/withMobileLayout'
import withResponsive from '../../hoc/withResponsive'
import { Table } from '../ui'
import { TAB_PROP_TYPE } from '../ui/Tabs/Tab'
import { getColumns } from './MarketList.columns'
import { KEYS, MAPPING } from './MarketList.constants'
import Header from './MarketList.Header'
import { reducer, getInitState, filterData as filterDataHelper } from './MarketList.helpers'
import Row from './MarketList.Row'
import Toolbar from './MarketList.Toolbar'

export const MarketList = (props) => {
  const {
    data,
    tabs,
    onRowClick,
    favs,
    saveFavs,
    filterData,
    defaultSortBy,
    rowMapping: customMapping,
    isMobileLayout: isSmallView,
  } = props

  const [state, dispatch] = useReducer(reducer, getInitState(tabs, defaultSortBy))
  const searchTerm = _get(state, `filter.${KEYS.BASE_CCY}`)
  const activeTab = _get(state, `filter.${KEYS.QUOTE_CCY}`)
  const sortBy = _get(state, 'sortBy')
  const sortAscending = _get(state, 'sortAscending')

  const getMappedKey = getMappingForKey(customMapping)
  const getMappedValue = useCallback(
    (d) => getValue({
      mapping: MAPPING,
      customMapping,
      data: d,
    }),
    [customMapping],
  )

  const { t } = useTranslation()
  const columns = useMemo(() => getColumns({ t, isSmallView }), [t, isSmallView])

  const filtered = useMemo(
    () => filterData({
      data,
      favs,
      activeTab,
      searchTerm,
      sortBy,
      sortAscending,
      getMappedKey,
      getMappedValue,
    }),
    [
      data,
      favs,
      activeTab,
      searchTerm,
      sortBy,
      sortAscending,
      filterData,
      getMappedKey,
      getMappedValue,
    ],
  )

  const toggleFav = (id) => {
    const newFavs = {
      ...favs,
      [id]: !favs[id],
    }
    saveFavs(newFavs)
  }

  const keyForId = getMappedKey(KEYS.ID)

  return (
    <div className={Classes.MARKET_LIST}>
      <Toolbar
        tabs={tabs}
        activeTab={activeTab}
        searchTerm={searchTerm}
        dispatch={dispatch}
      />
      <div className='divider' />
      <Table
        className={`${Classes.MARKET_LIST}__table`}
        interactive
      >
        <Header
          sortBy={sortBy}
          sortAscending={sortAscending}
          dispatch={dispatch}
          getMappedValue={getMappedValue}
          columns={columns}
        />
      </Table>

      <div className={Classes.TABLE_WRAPPER}>
        <Table
          className={`${Classes.MARKET_LIST}__table`}
          interactive
          striped
        >
          <tbody>
            {filtered.map((row) => {
              const id = _get(row, keyForId)

              return (
                <Row
                  key={id}
                  data={row}
                  isFav={favs[id]}
                  toggleFav={() => toggleFav(id)}
                  onRowClick={onRowClick}
                  getMappedValue={getMappedValue}
                  customMapping={customMapping}
                  columns={columns}
                />
              )
            })}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

MarketList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape(TAB_PROP_TYPE)).isRequired,
  onRowClick: PropTypes.func,
  favs: PropTypes.objectOf(PropTypes.bool).isRequired,
  saveFavs: PropTypes.func.isRequired,
  defaultSortBy: PropTypes.string,
  filterData: PropTypes.func,
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  /**
   * If true, show the OrderHistory in a condensed mobile layout. By default
   * the mobile layout will be enabled when the screen size is below the mobile
   * breakpoint (BREAKPOINTS.SM).
   */
  isMobileLayout: PropTypes.bool,
}

export const defaultProps = {
  defaultSortBy: 'volume',
  filterData: filterDataHelper,
  rowMapping: {},
  onRowClick: () => {},
  isMobileLayout: undefined,
}

MarketList.defaultProps = defaultProps

export default compose(
  withI18nProvider,
  withResponsive,
  withMobileLayout(BREAKPOINTS.SM),
  memo,
)(MarketList)
