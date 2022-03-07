import { getValue } from '@ufx-ui/utils'
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
import { getVirtualTableColumns } from '../helper'
import { VirtualTable } from '../ui'
import { TAB_PROP_TYPE } from '../ui/Tabs/Tab'
import { getColumns } from './MarketList.columns'
import { KEYS, MAPPING } from './MarketList.constants'
import { reducer, getInitState, filterData as filterDataHelper } from './MarketList.helpers'
import Toolbar from './MarketList.Toolbar'

const ROW_HEIGHT = 42

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
  const { t } = useTranslation()
  const [state, dispatch] = useReducer(reducer, getInitState(tabs, defaultSortBy))
  const searchTerm = _get(state, `filter.${KEYS.BASE_CCY}`)
  const activeTab = _get(state, `filter.${KEYS.QUOTE_CCY}`)

  const getMappedValue = useCallback(
    (d) => getValue({
      mapping: MAPPING,
      customMapping,
      data: d,
    }),
    [customMapping],
  )

  const getDisplayValue = useCallback(
    (rowData) => getValue({
      mapping: MAPPING,
      customMapping,
      data: rowData,
    }),
    [customMapping],
  )

  const toggleFav = (id) => {
    const newFavs = {
      ...favs,
      [id]: !favs[id],
    }
    saveFavs(newFavs)
  }

  const columns = getVirtualTableColumns(
    getColumns,
    {
      t, isSmallView, getDisplayValue, toggleFav, favs,
    },
    customMapping,
  )

  const filtered = useMemo(
    () => filterData({
      data,
      favs,
      activeTab,
      searchTerm,
      getMappedValue,
    }),
    [
      data,
      favs,
      activeTab,
      searchTerm,
      filterData,
      getMappedValue,
    ],
  )

  return (
    <div className={Classes.MARKET_LIST}>
      <Toolbar
        tabs={tabs}
        activeTab={activeTab}
        searchTerm={searchTerm}
        dispatch={dispatch}
      />

      <div className='divider' />

      <VirtualTable
        interactive
        striped
        columns={columns}
        data={filtered}
        rowHeight={ROW_HEIGHT}
        onRowClick={onRowClick}
        // give default key, dont give customised key
        defaultSortBy={defaultSortBy}
        defaultSortDirection='DESC'
      />
    </div>
  )
}

MarketList.propTypes = {
  /**
   * Data, which is rendering in MarketList
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * The tabs of the MarketList.
   * Tab object should has required properties (strings): id , title.
   */
  tabs: PropTypes.arrayOf(PropTypes.shape(TAB_PROP_TYPE)).isRequired,
  /**
   * The function, called when a market row is clicked
   */
  onRowClick: PropTypes.func,
  /**
   * Object with pairs, selected as favorites
   */
  favs: PropTypes.objectOf(PropTypes.bool).isRequired,
  /**
   * The function, called, when user sets pair as favorite
   */
  saveFavs: PropTypes.func.isRequired,
  /**
   * Default value of list dataKey, which is sorted by
   */
  defaultSortBy: PropTypes.string,
  /**
   * The function, using for filtering list data
   */
  filterData: PropTypes.func,
  /**
   * The custom field/column mapping for the data.
   */
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
