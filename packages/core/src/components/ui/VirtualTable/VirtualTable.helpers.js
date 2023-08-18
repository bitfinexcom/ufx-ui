/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import _forEach from 'lodash/forEach'
import _get from 'lodash/get'
import _isFunction from 'lodash/isFunction'
import _values from 'lodash/values'
import React from 'react'
import Draggable from 'react-draggable'
import { defaultTableHeaderRenderer } from 'react-virtualized'

const COLUMN_MAX_WIDTH = 300

const DRAGGABLE_POSITION = {
  x: 0,
  y: 0,
}

export const getTransformers = (columns = []) => {
  const transformers = {}

  _forEach(columns, (col) => {
    if (col.dataKey && col.transformData) {
      transformers[col.dataKey] = col.transformData
    }
  })

  return transformers
}

export const getSortKeys = (columns = []) => {
  const sortKeys = {}

  _forEach(columns, (col) => {
    if (col.sortKey) {
      sortKeys[col.dataKey] = col.sortKey
    }
  })

  return sortKeys
}

/**
 * Returns a sorted copy of the provided dataset; values are cast to strings
 * before comparison via localeCompare(). The transformers map is optional,
 * and can be used to process field values before casting/comparison.
 *
 * @param {Object} params
 * @param {string} params.sortBy - used as key into transformers map
 * @param {string} params.sortDirection
 * @param {Array} params.data
 * @param {Object} params.transfomers - data transform functions, key'ed by col
 * @return {Array} sortedData
 */
export const getSortedData = (args = {}) => {
  const {
    data, sortBy, sortDirection, columns,
  } = args

  const transformers = getTransformers(columns)
  const sortKeys = getSortKeys(columns)
  const transform = transformers[sortBy] || ((v) => v)
  const asc = sortDirection === 'ASC'
  const key = sortKeys[sortBy] || sortBy

  return _values(data).sort((aRow = {}, bRow = {}) => {
    const a = transform(_get(aRow, key), aRow)
    const b = transform(_get(bRow, key), bRow)

    if (_isFunction(sortKeys[key])) {
      return sortKeys[key](a, b)
    }

    if (!Number.isNaN(+a) && !Number.isNaN(+b)) {
      return asc ? (+a) - (+b) : (+b) - (+a)
    }

    return asc
      ? (`${a}`).localeCompare(b)
      : (`${b}`).localeCompare(a)
  })
}

export const sortData = (args = {}, props = {}) => {
  const { getSortedData: getData, sortedDataPostProcessor } = props
  const sortedData = getData(args)

  sortedDataPostProcessor(sortedData)

  return sortedData
}

export const columnHeaderRenderer = (
  columnParams,
  setColumnsWidthState,
  updateTableState,
) => {
  const {
    dataKey,
    minWidth = 30,
    width,
    label,
    columnData: { disableDrag = false } = {},
  } = columnParams
  const isDraggable = !!label && !disableDrag

  const onStop = (e, { x }) => {
    e.stopPropagation()
    setColumnsWidthState((prevState) => {
      let nextValue = prevState[dataKey] + x

      if (nextValue > Math.max(COLUMN_MAX_WIDTH, width)) {
        nextValue = COLUMN_MAX_WIDTH
      }

      if (nextValue < minWidth) {
        nextValue = minWidth
      }

      const newState = {
        ...prevState,
        [dataKey]: nextValue,
      }

      updateTableState({ columnsWidthState: newState })
      return newState
    })
  }

  const onDragHandlerClick = (e) => e.stopPropagation()

  return (
    <div className='column-header'>
      <div className='column-header__text'>
        {defaultTableHeaderRenderer(columnParams)}
      </div>
      {isDraggable && (
        <Draggable
          axis='x'
          defaultClassName='DragHandle'
          defaultClassNameDragging='DragHandleActive'
          onStop={onStop}
          position={DRAGGABLE_POSITION}
          zIndex={999}
        >
          <div onClick={onDragHandlerClick} />
        </Draggable>
      )}
    </div>
  )
}
