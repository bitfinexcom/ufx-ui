import { PROP_DEFAULT_CCYS, Trades, TRADE_TYPES } from '@ufx-ui/core'
import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useInjectSaga } from 'redux-injectors'

import useCommonBfxData from '../../hooks/useCommonBfxData'
import { fetchAuthTradesHistory } from '../../redux/actions/authTrades.actions'
import { WSResubscribeChannel } from '../../redux/actions/ws.actions'
import { AUTH_TRADES_REDUCER_SAGA_KEY } from '../../redux/constants/authTrades.constants'
import { SUBSCRIPTION_CONFIG } from '../../redux/constants/trades.constants'
import authTradesSaga from '../../redux/sagas/authTrades.saga'
import { getRecentAuthTrades, hasFetchedAuthTrades as hasFetchedAuthTradesSelector } from '../../redux/selectors/authTrades.selectors'
import { getSymbolMinOrderSize } from '../../redux/selectors/symbols.selectors'
import { getRecentTrades, hasFetchedTrades as hasFetchedTradesSelector } from '../../redux/selectors/trades.selectors'
import { getUIIsMarketTrades } from '../../redux/selectors/UI.selectors'

const TradesContainer = (props) => {
  const {
    baseCcy,
    quoteCcy,
    ...rest
  } = props
  useInjectSaga({ key: AUTH_TRADES_REDUCER_SAGA_KEY, saga: authTradesSaga })

  const {
    isWSConnected,
    isAuthenticated,
    symbol,
    dispatch,
  } = useCommonBfxData(baseCcy, quoteCcy)

  const marketData = useSelector(state => getRecentTrades(state, symbol))
  const userData = useSelector(state => getRecentAuthTrades(state, symbol))
  const hasFetchedAuthTrades = useSelector(state => hasFetchedAuthTradesSelector(state, symbol))
  const hasFetchedTrades = useSelector(state => hasFetchedTradesSelector(state, symbol))
  const isMarketTrades = useSelector(getUIIsMarketTrades)

  const minOrderSize = useSelector(state => getSymbolMinOrderSize(state, symbol))

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAuthTradesHistory({ symbol }))
    }
  }, [dispatch, isAuthenticated, symbol])

  // resubscribe on symbol change
  useEffect(() => {
    if (isWSConnected && symbol) {
      dispatch(WSResubscribeChannel({
        ...SUBSCRIPTION_CONFIG,
        symbol,
      }))
    }
  }, [isWSConnected, symbol, dispatch])

  const loading = isMarketTrades ? !hasFetchedTrades : !hasFetchedAuthTrades
  const tradeType = isMarketTrades ? TRADE_TYPES.MARKET : TRADE_TYPES.USER

  return (
    <Trades
      online={isWSConnected}
      loading={loading}
      market={marketData}
      user={userData}
      showType={tradeType}
      minOrderSize={minOrderSize}
        // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
}

TradesContainer.propTypes = PROP_DEFAULT_CCYS.props

TradesContainer.defaultProps = PROP_DEFAULT_CCYS.defaults

export default memo(TradesContainer)
