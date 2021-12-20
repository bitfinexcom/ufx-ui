import _get from 'lodash/get'
import _isFunction from 'lodash/isFunction'
import _min from 'lodash/min'

import { GRID_COLUMNS } from './Grid.constants'

const generateGridFormat = (comp) => ({
  minW: undefined,
  minH: undefined,
  maxW: undefined,
  maxH: undefined,
  moved: false,
  static: false,
  isDraggable: undefined,
  isResizable: undefined,
  ...comp,
})

const buildGridColumns = (items, breakpoint, currentColumns, columnIdx) => {
  const currentColumnX = currentColumns[columnIdx]
  const nextColumnX = _get(currentColumns, columnIdx + 1, null)
  const maxLength = _get(GRID_COLUMNS, breakpoint, 0)

  let nextY = 0
  let lastY = 0
  return items.map((columnItem) => {
    let item = columnItem
    let itemOverwrites = {}

    const itemWidth = (nextColumnX)
      ? nextColumnX - currentColumnX
      : maxLength - currentColumnX

    if (_isFunction(columnItem)) {
      const overwriteArgs = {
        breakpoint,
        columnX: currentColumnX,
        columnWidth: itemWidth,
      }

      const { defaults, component } = columnItem(overwriteArgs)
      itemOverwrites = defaults
      item = component
    }

    const { id, defaults } = item

    let compSettings = {
      ...defaults,
      x: currentColumnX,
      y: nextY,
      minW: _min(defaults.minW, itemWidth),
      w: itemWidth,
      ...itemOverwrites,
      i: id,
    }

    const thisX = compSettings.x
    if (thisX !== currentColumnX) {
      compSettings = {
        ...compSettings,
        y: lastY,
      }
    }

    if (thisX === currentColumnX) {
      // only increase Y if the current component is a the column x
      // not in the same row as last one
      lastY = nextY
      nextY += compSettings.h
    }

    return generateGridFormat(compSettings)
  })
}

// used to generate default layouts from layout configs
export const generateLayout = (layoutConfig) => {
  const {
    defaultColumns = [],
    defaultLayout = {},
  } = layoutConfig

  const breakpoints = Object.keys(defaultLayout)

  const layout = breakpoints.reduce((acc, breakpoint) => {
    const breakpointLayout = _get(defaultLayout, breakpoint, [])
    const breakpointColumns = _get(defaultColumns, breakpoint, [])

    let generatedLayout = []
    for (let columnIdx = 0; columnIdx < breakpointColumns.length; columnIdx += 1) {
      const columnLayout = _get(breakpointLayout, columnIdx, [])
      const layoutColumns = buildGridColumns(columnLayout, breakpoint, breakpointColumns, columnIdx)
      generatedLayout = generatedLayout.concat(layoutColumns)
    }

    return {
      ...acc,
      [breakpoint]: generatedLayout,
    }
  }, {})

  return layout
}

export const addNewComponent = (component, currentLayout) => {
  const {
    id,
    defaults = {},
  } = component

  const {
    w = 0,
    minW = 0,
  } = defaults

  const newW = w || minW
  const placeAtY = 0

  const newComponentLayout = {
    ...defaults,
    i: id,
    x: 0,
    y: placeAtY,
    w: newW,
  }

  // we add to top
  return currentLayout.map((layout) => {
    // move other components on same y
    if (layout.y === placeAtY) {
      return {
        ...layout,
        y: placeAtY + 1,
      }
    }

    return layout
  }).concat(newComponentLayout)
}

export const calculateNonVisible = (gridComponents, currentLayout) => {
  const allComponents = Object.keys(gridComponents)
  const visibleComponents = currentLayout.map(item => item.i)
  const nonVisible = allComponents.filter(compId => !visibleComponents.includes(compId))
  return nonVisible
}
