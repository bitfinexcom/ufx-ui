/* eslint-disable react-hooks/exhaustive-deps  */
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Intent, Classes, PROP_GRID_CONFIG, Button, Tooltip, ResponsiveState,
} from '@ufx-ui/core'
import { difference } from '@ufx-ui/utils'
import _get from 'lodash/get'
import _isEqual from 'lodash/isEqual'
import _isFunction from 'lodash/isFunction'
import _reduce from 'lodash/reduce'
import _reject from 'lodash/reject'
import _size from 'lodash/size'
import PropTypes from 'prop-types'
import React, {
  memo, useEffect, useState,
} from 'react'
import { useTranslation } from 'react-i18next'

import { addNewComponent, calculateNonVisible } from './Grid.layouts'

const GridEditLayout = (props) => {
  const { t } = useTranslation()
  const {
    gridComponents,
    removeComponent,
    layouts,
    breakpoint,
    onUpdateLayout,
    onSaveLayout: onSaveLayoutProp,
    onResetLayout,
    onClose,
  } = props
  const { width } = ResponsiveState()
  const isSmall = width < Classes.BREAKPOINTS.XS

  const [nonVisible, setNonVisible] = useState([])
  const [savedLayouts, setSavedLayouts] = useState(layouts) // used for checking unsaved changes
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const handleUpdateVisible = () => {
    const currentLayout = _get(layouts, breakpoint)
    const nonVisibleCalc = calculateNonVisible(gridComponents, currentLayout)
    setNonVisible(nonVisibleCalc)
  }

  const handleUpdateLayout = (nextLayout) => {
    const nextLayouts = {
      ...layouts,
      [breakpoint]: nextLayout,
    }
    onUpdateLayout(nextLayouts)
    handleUpdateVisible()
  }

  useEffect(() => {
    if (!removeComponent) {
      return
    }

    const currentLayout = _get(layouts, breakpoint)
    const nextLayout = _reject(currentLayout, { i: removeComponent })
    handleUpdateLayout(nextLayout)
  }, [removeComponent])

  const onSaveLayout = () => {
    onSaveLayoutProp(layouts)
    setSavedLayouts(layouts)
    setUnsavedChanges(false)
  }

  // find non visible components
  useEffect(() => {
    handleUpdateVisible()

    const hasChanges = !_isEqual(savedLayouts, layouts)
    // sync both layouts/savedLayouts, if for each grid-key layouts/savedLayouts[curr-breakpoint] has same values but still not equal
    const changes = difference(layouts[breakpoint], savedLayouts[breakpoint])
    const changedKeys = _reduce(
      changes,
      (acc, curr) => acc + _size(curr),
      0,
    )

    if (hasChanges && changedKeys === 0) {
      onSaveLayout()
    } else {
      setUnsavedChanges(hasChanges)
    }
  }, [layouts])

  const onAddItem = (componentId) => {
    const componentToAdd = _get(gridComponents, componentId)
    if (!componentToAdd) {
      // eslint-disable-next-line
      console.warn(`Grid component not found: ${componentId}`)
      return
    }

    const currentLayout = _get(layouts, breakpoint)
    const nextLayout = addNewComponent(componentToAdd, currentLayout)
    handleUpdateLayout(nextLayout)
  }

  const onUndoChanges = () => {
    const currentLayout = _get(savedLayouts, breakpoint)
    handleUpdateLayout(currentLayout)
  }

  const getTitle = (name) => {
    const title = _get(gridComponents, `${name}.title`, {})
    return (_isFunction(title))
      ? title()
      : title
  }

  const showAddButton = nonVisible.length > 0

  return (
    <>
      <div className='grid-edit'>
        <div className='title'>
          <span className='text'>{t('grid:edit_layout')}</span>
          <span className='tooltip'>
            <Tooltip content={t('grid:tip')}>
              <FontAwesomeIcon icon={faInfoCircle} />
            </Tooltip>
          </span>
        </div>

        {showAddButton && (
        <span className='add'>
          <Tooltip
            trigger='click'
            placement='bottom'
            className={`${Classes.GRID}__nonvisible-list`}
            content={(
              <div className='list'>
                {nonVisible.map((itemName) => (
                  <Button
                    minimal
                    small
                    key={itemName}
                    onClick={() => onAddItem(itemName)}
                  >{getTitle(itemName)}
                  </Button>
                ))}
              </div>
                )}
          >
            <Button
              small
              intent={Intent.PRIMARY}
              title={t('grid:add_component')}
            >
              {isSmall ? t('grid:add') : t('grid:add_component')}
            </Button>
          </Tooltip>
        </span>
        )}

        {unsavedChanges && (
          <span className='undo'>
            <Button
              minimal
              onClick={onUndoChanges}
            >
              {t('grid:undo')}
            </Button>
          </span>
        )}

        <span className='save'>
          <Button
            small
            onClick={onSaveLayout}
            intent={Intent.SUCCESS}
            disabled={!unsavedChanges}
          >
            {t('grid:save')}
          </Button>
        </span>

        <span className='reset'>
          <Button small minimal onClick={onResetLayout}>
            {t('grid:reset')}
          </Button>
        </span>

        <span className='close'>
          <Button small minimal onClick={onClose}>
            {t('grid:close')}
          </Button>
        </span>

      </div>
    </>
  )
}

GridEditLayout.propTypes = {
  gridComponents: PropTypes.shape(PROP_GRID_CONFIG).isRequired,
  removeComponent: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  layouts: PropTypes.object.isRequired,
  breakpoint: PropTypes.string.isRequired,
  onUpdateLayout: PropTypes.func.isRequired,
  onSaveLayout: PropTypes.func.isRequired,
  onResetLayout: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

GridEditLayout.defaultProps = {
  removeComponent: null,
}

export default memo(GridEditLayout)
