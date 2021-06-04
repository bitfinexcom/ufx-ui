import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInjectSaga } from 'redux-injectors'

import { fetchAllTickersPeriodically } from '../redux/actions/ticker.actions'
import { TICKER_REDUCER_SAGA_KEY } from '../redux/constants/ticker.constants'
import tickerSaga from '../redux/sagas/ticker.saga'
import { getTickers, getTradingTickerKeys } from '../redux/selectors/ticker.selectors'

const useTickers = () => {
  useInjectSaga({ key: TICKER_REDUCER_SAGA_KEY, saga: tickerSaga })

  const dispatch = useDispatch()
  const tickers = useSelector(getTickers)
  const tradingTickerKeys = useSelector(getTradingTickerKeys)

  useEffect(() => {
    dispatch(fetchAllTickersPeriodically())
  }, [dispatch])

  return { tickers, tradingTickerKeys }
}

export default useTickers
