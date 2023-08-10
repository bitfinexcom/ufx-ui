import { i18n } from '@ufx-ui/core'
import { urlPair as urlPairFunc, defaultUrlPair, defaultUrlPairPaper } from '@ufx-ui/utils'
import PropTypes from 'prop-types'
import React, { useEffect, useCallback, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Trading from './Trading'
import tradingLayout from '../../containers/Grid/layouts/trading'
import tradingNoAuthLayout from '../../containers/Grid/layouts/tradingNoAuth'
import Notifications from '../../containers/Notifications'
import { layoutEditEnable } from '../../redux/actions/layouts.actions'
import { notifyInfo } from '../../redux/actions/notifications.actions'
import { set } from '../../redux/actions/UI.actions'
import { getLayoutIsEditable } from '../../redux/selectors/layouts.selectors'
import { getUIIsPaperTrading } from '../../redux/selectors/UI.selectors'
import { getWSIsAuthenticated } from '../../redux/selectors/ws.selectors'

const TradingContainer = (props) => {
  const { match, history } = props
  const { params: { pair } } = match

  const layoutIsEditable = useSelector(getLayoutIsEditable)
  const isPaperTrading = useSelector(getUIIsPaperTrading)
  const defaultPair = isPaperTrading ? defaultUrlPairPaper : defaultUrlPair
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(set({
      section: 'currentPair',
      value: pair || defaultPair,
    }))
  }, [dispatch, pair, defaultPair])

  const onEdit = useCallback(
    () => {
      dispatch(layoutEditEnable())
    },
    [dispatch],
  )

  const onTickerChange = useCallback(({ rowData }) => {
    const { baseCcy, quoteCcy, id } = rowData
    dispatch(notifyInfo(`${i18n.t('trading:switching_to')} ${baseCcy}/${quoteCcy}`))
    history.push(`/trading/${urlPairFunc(id)}`)
  }, [dispatch, history])

  const isAuthenticated = useSelector(getWSIsAuthenticated)

  const defaultLayout = (isAuthenticated)
    ? tradingLayout
    : tradingNoAuthLayout

  return (
    <>
      <Trading
        layoutConfig={defaultLayout}
        onTickerChange={onTickerChange}
        layoutIsEditable={layoutIsEditable}
        onEdit={onEdit}
        history={history}
      />
      <Notifications />
    </>
  )
}

TradingContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    params: PropTypes.object.isRequired,
  }).isRequired,
}

export default memo(TradingContainer)
