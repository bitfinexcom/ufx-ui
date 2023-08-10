import { PROP_LAYOUT_CONFIG } from '@ufx-ui/core'
import PropTypes from 'prop-types'
import React, { useCallback, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import Grid from './Grid'
import { generateLayout } from './Grid.layouts'
import { layoutEditClose } from '../../redux/actions/layouts.actions'
import { notifyInfo } from '../../redux/actions/notifications.actions'
import { getLayoutIsEditable } from '../../redux/selectors/layouts.selectors'
import { getNicePair, getUrlPair } from '../../redux/selectors/UI.selectors'
import { getWSIsAuthenticated } from '../../redux/selectors/ws.selectors'

const GridContainer = (props) => {
  const {
    layoutConfig,
    onTickerChange,
    onTransferClick,
    className,
  } = props
  const { t } = useTranslation()

  const urlPair = useSelector(getUrlPair)
  const formattedPair = useSelector(getNicePair)
  const authenticated = useSelector(getWSIsAuthenticated)
  const layoutIsEditable = useSelector(getLayoutIsEditable)

  const dispatch = useDispatch()
  const notify = useCallback(
    (message) => {
      dispatch(notifyInfo(message))
    },
    [dispatch],
  )

  const onLoadLayout = useCallback((key) => {
    let userLayout
    if (authenticated && key) {
      // try to load
      userLayout = window.localStorage.getItem(key)
    }

    let nextLayout
    if (!userLayout) {
      // generate default layout
      nextLayout = generateLayout(layoutConfig)
    } else {
      // use user layout
      nextLayout = JSON.parse(userLayout)
    }

    return nextLayout
  }, [authenticated, layoutConfig])

  const onSaveLayout = useCallback((key, layout) => {
    if (!authenticated || !key) {
      return
    }

    notify(t('grid:layout_saved'))
    window.localStorage.setItem(key, JSON.stringify(layout))
  }, [authenticated, notify, t])

  const onClose = useCallback(
    () => {
      dispatch(layoutEditClose())
    },
    [dispatch],
  )

  return (
    <Grid
      urlPair={urlPair}
      formattedPair={formattedPair}
      authenticated={authenticated}
      layoutConfig={layoutConfig}
      layoutIsEditable={layoutIsEditable}
      onTickerChange={onTickerChange}
      onTransferClick={onTransferClick}
      onLoadLayout={onLoadLayout}
      onSaveLayout={onSaveLayout}
      onClose={onClose}
      className={className}
    />
  )
}

GridContainer.propTypes = {
  layoutConfig: PropTypes.shape(PROP_LAYOUT_CONFIG).isRequired,
  onTickerChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

GridContainer.defaultProps = {
  className: null,
}

export default memo(GridContainer)
