import cx from 'classnames'
import _findIndex from 'lodash/findIndex'
import _setf from 'lodash/fp/set'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, {
  memo, useState, useEffect, useCallback,
} from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import { PROP_LAYOUT_CONFIG } from '../../common/props'
import { defaultUrlPair } from '../../functions/config.selectors'
import withI18nProvider from '../../hoc/withI18nProvider'
import withResponsive from '../../hoc/withResponsive'
import GridComponent from './Grid.Component'
import {
  GRID_BREAKPOINTS,
  GRID_COLUMNS,
  GRID_CELL_SPACINGS,
  GRID_ROW_HEIGHT,
  STORED_LAYOUT_TRADING_KEY,
} from './Grid.constants'
import GridEditLayout from './Grid.EditLayout'
import { generateLayout } from './Grid.layouts'

const ResponsiveGridLayout = WidthProvider(Responsive)

const Grid = (props) => {
  const { i18n } = useTranslation()
  const {
    formattedPair,
    urlPair,
    authenticated,
    layoutConfig,
    layoutIsEditable: isEditing,
    onTickerChange,
    onTransferClick,
    onLoadLayout,
    onSaveLayout,
    onClose,
  } = props

  const [breakpoint, setBreakpoint] = useState(Responsive.utils.getBreakpointFromWidth(GRID_BREAKPOINTS, document.body.clientWidth))
  const [layouts, setLayouts] = useState(null)
  const [removeComponent, setRemoveComponent] = useState(null)
  const [currentLayoutConfig, setCurrentLayoutConfig] = useState(layoutConfig)

  const { gridComponents } = layoutConfig
  const currentLayout = _get(layouts, breakpoint, null)

  // helper to update the grid layout
  const onUpdateLayout = (nextLayouts) => {
    setLayouts(nextLayouts)
    setRemoveComponent(null)
  }

  const onGridItemLayoutChange = (id, height) => {
    const gridItemHeight = height / GRID_ROW_HEIGHT
    const compIndex = _findIndex(currentLayout, ({ i }) => i === id)

    if (compIndex) {
      const savedLayouts = JSON.parse(window.localStorage.getItem(STORED_LAYOUT_TRADING_KEY))
      const currentMinH = _get(currentLayout, [compIndex, 'minH'])

      const currentSavedLayout = _get(savedLayouts, [breakpoint], [])
      const savedCompLayout = _findIndex(currentSavedLayout, ({ i }) => i === id)
      const savedCompHeight = _get(currentSavedLayout, [savedCompLayout, 'h'], 0)

      // apply comp minH
      // or comp child height
      // or user customised/saved height
      const updatedHeight = Math.max(currentMinH, gridItemHeight, savedCompHeight)

      const updatedLayouts = _setf([breakpoint, compIndex, 'h'], updatedHeight, layouts)
      setLayouts(updatedLayouts)
    }
  }

  const handleLoadLayout = useCallback(() => {
    const nextLayouts = onLoadLayout(layoutConfig.gridId)
    onUpdateLayout(nextLayouts)
  }, [layoutConfig.gridId, onLoadLayout])

  // set the initial layout
  useEffect(() => {
    handleLoadLayout()
  }, [handleLoadLayout])

  // update layout config
  useEffect(() => {
    setCurrentLayoutConfig(layoutConfig)
  }, [layoutConfig, setCurrentLayoutConfig, i18n.language])

  // grid internal onChange
  const onLayoutChange = (layout, allBreakpoints) => {
    // only take layout changes if we’re editing
    if (!isEditing) return
    onUpdateLayout(allBreakpoints)
  }

  const handleSaveLayout = (layout) => {
    onSaveLayout(layoutConfig.gridId, layout)
  }

  const resetToDefault = () => {
    const defaultLayout = generateLayout(layoutConfig)
    onUpdateLayout(defaultLayout)
  }

  const configChanged = currentLayoutConfig !== layoutConfig
  if (!currentLayout || configChanged) {
    return null
  }

  return (
    <div className={cx(Classes.GRID, {
      [`${Classes.GRID}__editing`]: isEditing,
    })}
    >
      {isEditing && (
        <GridEditLayout
          gridComponents={gridComponents}
          removeComponent={removeComponent}
          layouts={layouts}
          onUpdateLayout={onUpdateLayout}
          onSaveLayout={handleSaveLayout}
          onResetLayout={resetToDefault}
          onClose={onClose}
          breakpoint={breakpoint}
        />
      )}

      <ResponsiveGridLayout
        className='grid-layout'
        layouts={layouts}
        isDraggable={isEditing}
        isResizable={isEditing}
        onLayoutChange={onLayoutChange}
        onBreakpointChange={setBreakpoint}
        breakpoints={GRID_BREAKPOINTS}
        cols={GRID_COLUMNS}
        margin={GRID_CELL_SPACINGS}
        containerPadding={GRID_CELL_SPACINGS}
        rowHeight={GRID_ROW_HEIGHT}
        measureBeforeMount
        useCSSTransforms={false}
      >
        {currentLayout.map((componentConfig) => {
          const {
            i: componentId,
          } = componentConfig
          const componentLayout = _get(gridComponents, componentId)

          if (!componentLayout) {
            return <div />
          }

          return (
            <div
              key={componentId}
              className={cx({
                'grid-layout__component-wrapper': true,
                'grid-layout__is-editing': isEditing,
              })}
            >
              <GridComponent
                componentLayout={componentLayout}
                urlPair={urlPair}
                formattedPair={formattedPair}
                isEditing={isEditing}
                onRemoveComponent={setRemoveComponent}
                authenticated={authenticated}
                gridComponents={gridComponents}
                layout={currentLayout}
                onTickerChange={onTickerChange}
                onTransferClick={onTransferClick}
                onUpdateLayout={onGridItemLayoutChange}
              />
            </div>
          )
        })}
      </ResponsiveGridLayout>

      <div className={`${Classes.GRID}__background`} />

    </div>
  )
}

Grid.propTypes = {
  formattedPair: PropTypes.string.isRequired,
  urlPair: PropTypes.string,
  authenticated: PropTypes.bool,
  layoutIsEditable: PropTypes.bool,
  layoutConfig: PropTypes.shape(PROP_LAYOUT_CONFIG).isRequired,
  onLoadLayout: PropTypes.func,
  onSaveLayout: PropTypes.func,
  onClose: PropTypes.func,
  onTickerChange: PropTypes.func,
}

Grid.defaultProps = {
  urlPair: defaultUrlPair,
  authenticated: false,
  layoutIsEditable: false,
  onTickerChange: () => {},
  onLoadLayout: () => {},
  onSaveLayout: () => {},
  onClose: () => {},
}

export default withI18nProvider(withResponsive(memo(Grid)))
