import _orderBy from 'lodash/orderBy'
import PropTypes from 'prop-types'
import { useState, useMemo } from 'react'

const getDefaultSortedData = (data, sortBy, sortAscending) => _orderBy(
  data,
  [sortBy],
  [sortAscending ? 'asc' : 'desc'],
)

const useSortableData = (data, config = null, sortData = getDefaultSortedData) => {
  const [sortConfig, setSortConfig] = useState(config)

  const sortedData = useMemo(() => {
    if (sortConfig !== null) {
      return sortData(data, sortConfig.key, sortConfig.sortAscending)
    }
    return data
  }, [data, sortConfig, sortData])

  const requestSort = (key, defaultSortAscending = true) => {
    let sortAscending = defaultSortAscending
    if (sortConfig && sortConfig.key === key && sortConfig.sortAscending === sortAscending) {
      sortAscending = !sortAscending
    }
    setSortConfig({ key, sortAscending })
  }

  return { data: sortedData, requestSort, sortConfig }
}

export const SORT_CONFIG_PROPS = {
  key: PropTypes.string,
  sortAscending: PropTypes.bool,
}

export default useSortableData
