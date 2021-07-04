/* eslint-disable import/prefer-default-export */
import { getMappedColumns } from '@ufx-ui/utils'
import _get from 'lodash/get'
import _map from 'lodash/map'
import memoizeOne from 'memoize-one'
import React from 'react'

import Truncate from './ui/Truncate'

export const getDefaultCellRenderer = (getDisplayValue, truncate = true) => ({ dataKey, rowData }) => {
  const formattedValue = getDisplayValue(rowData)(dataKey)

  if (!truncate) {
    return formattedValue
  }

  return <Truncate>{formattedValue}</Truncate>
}

export const getVirtualTableColumns = memoizeOne((
  getColumns,
  getColumnsArgs,
  rowMapping,
) => {
  const mappedColumns = getMappedColumns(getColumns(getColumnsArgs))

  // transform columns to react-virtualized format
  const transformedColumns = _map(mappedColumns, (col) => {
    const cellRenderer = _get(rowMapping, [col.dataKey, 'renderer'], col.renderer)
    const sortKey = _get(rowMapping, [col.dataKey, 'selector'], col.dataKey)

    return {
      ...col,
      sortKey,
      cellRenderer,
    }
  })

  return transformedColumns
})
