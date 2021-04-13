import { useSelector, useDispatch } from 'react-redux'

import { buildPair } from '../functions/format'
import { convertToUrlPair } from '../functions/symbols'
import { getRegularPair } from '../redux/selectors/currencies.selectors'
import { getWSIsAuthenticated, getWSConnected } from '../redux/selectors/ws.selectors'

const useCommonBfxData = (baseCcy, quoteCcy) => {
  const isWSConnected = useSelector(getWSConnected)
  const isAuthenticated = useSelector(getWSIsAuthenticated)

  const getPair = useSelector(getRegularPair)
  const pair = getPair(convertToUrlPair(baseCcy, quoteCcy))
  const symbol = buildPair(baseCcy, quoteCcy)

  const dispatch = useDispatch()

  return {
    isWSConnected,
    isAuthenticated,
    pair,
    symbol,
    dispatch,
  }
}

export default useCommonBfxData
