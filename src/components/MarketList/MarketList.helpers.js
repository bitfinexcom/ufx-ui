import _filter from 'lodash/filter'
import _get from 'lodash/get'
import _includes from 'lodash/includes'
import _orderBy from 'lodash/orderBy'
import _reverse from 'lodash/reverse'
import _toLower from 'lodash/toLower'

import { KEYS, ACTION_TYPES, FAV_TAB } from './MarketList.constants'

export const getDefaultTab = (tabs) => _get(tabs, [0, 'id'], '')

export const getInitState = (tabs, defaultSortBy) => ({
  filter: {
    baseCcy: '',
    quoteCcy: getDefaultTab(tabs),
  },
  sortBy: defaultSortBy,
  sortAscending: false,
})

export const reducer = (state, action) => {
  const { type, payload } = action
  const {
    filterKey,
    filterValue,
    sortBy,
    sortAscending,
  } = payload

  switch (type) {
    case ACTION_TYPES.SET_FILTER: {
      const filter = {
        ...state.filter,
        [filterKey]: filterValue,
      }

      return {
        ...state,
        filter,
      }
    }

    case ACTION_TYPES.SET_SORT:
      return {
        ...state,
        sortBy,
        sortAscending,
      }

    default:
      return state
  }
}

export const filterData = ({
  data,
  favs,
  activeTab,
  searchTerm,
  sortBy,
  sortAscending,
  getMappedValue,
  getMappedKey,
}) => {
  const term = _toLower(searchTerm)
  const tab = _toLower(activeTab)

  const filtered = _filter(data, (item) => {
    const getDisplayValue = getMappedValue(item)
    const id = getDisplayValue(KEYS.ID)
    const baseCcy = _toLower(getDisplayValue(KEYS.BASE_CCY))
    const quoteCcy = _toLower(getDisplayValue(KEYS.QUOTE_CCY))

    return (quoteCcy === tab || (activeTab === FAV_TAB && favs[id])) // filter by activeTab
    && (_includes(baseCcy, term) || _includes(quoteCcy, term)) // filter by searchTerm
  })

  const mappedSortBy = getMappedKey(sortBy)
  const sorted = _orderBy(filtered, [mappedSortBy])

  if (sortAscending) {
    return sorted
  }

  return _reverse(sorted)
}
