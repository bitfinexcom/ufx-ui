import { ButtonTradesToggle } from '@ufx-ui/core'
import React, { memo, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { set } from '../../redux/actions/UI.actions'
import { IS_MARKET_TRADES } from '../../redux/constants/UI.constants'
import { getUIIsMarketTrades } from '../../redux/selectors/UI.selectors'
import { getWSIsAuthenticated } from '../../redux/selectors/ws.selectors'

const TradesToggleContainer = () => {
  const isAuthenticated = useSelector(getWSIsAuthenticated)
  const isMarketTrades = useSelector(getUIIsMarketTrades)

  const dispatch = useDispatch()

  const action = (value) => set({
    section: IS_MARKET_TRADES,
    value,
  })

  const setIsMarketTrades = useCallback(
    () => {
      dispatch(action(!isMarketTrades))
    },
    [dispatch, isMarketTrades],
  )

  useEffect(() => {
    dispatch(action(!isAuthenticated))
  }, [isAuthenticated, dispatch])

  return (
    <ButtonTradesToggle
      isMarket={isMarketTrades}
      toggle={setIsMarketTrades}
      authenticated={isAuthenticated}
    />
  )
}

export default memo(TradesToggleContainer)
