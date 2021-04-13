import { useEffect } from 'react'
import { useBeforeunload } from 'react-beforeunload'
import { useSelector, useDispatch } from 'react-redux'

import { requestUIBootstrapData } from '../redux/actions/bootstrap.actions'
import { requestCurrenciesInfo, requestSymbolDetails, requestConversions } from '../redux/actions/currencies.actions'
import {
  WSConnectThrottled,
  WSDisconnect,
  WSSubscribeAuthChannel,
  WSUnsubscribeAuthChannel,
} from '../redux/actions/ws.actions'
import { getWSConnected, getWSIsAuthenticated } from '../redux/selectors/ws.selectors'

const useInjectBfxData = ({
  shouldFetchWSData = true,
} = {}) => {
  const isAuthenticated = useSelector(getWSIsAuthenticated)
  const dispatch = useDispatch()

  // start: fetch common data used across all containers
  useEffect(() => {
    dispatch(requestCurrenciesInfo())
    dispatch(requestConversions())
    dispatch(requestSymbolDetails())

    if (isAuthenticated) {
      dispatch(requestUIBootstrapData())
    }
  }, [dispatch, isAuthenticated])

  // end: fetch common data used across all containers

  // start: websocket connection
  const isWSConnected = useSelector(getWSConnected)

  // connect/disconnect websocket
  useEffect(() => {
    if (shouldFetchWSData && !isWSConnected) {
      WSConnectThrottled(dispatch)
    }
  }, [dispatch, shouldFetchWSData, isWSConnected])

  // subscribe/unsubscribe to auth channel
  useEffect(() => {
    if (shouldFetchWSData) {
      if (isWSConnected && !isAuthenticated) {
        dispatch(WSSubscribeAuthChannel())
      }
    }

    return () => {
      if (shouldFetchWSData && isWSConnected && isAuthenticated) {
        dispatch(WSUnsubscribeAuthChannel())
      }
    }
  }, [dispatch, shouldFetchWSData, isWSConnected, isAuthenticated])

  // disconnect before page unload
  useBeforeunload(() => {
    if (shouldFetchWSData) {
      dispatch(WSUnsubscribeAuthChannel())
      dispatch(WSDisconnect())
    }
  })

  useEffect(() => () => {
    if (isWSConnected) {
      dispatch(WSDisconnect())
    }
  }, [dispatch, isWSConnected])
  // end: websocket connection
}

export default useInjectBfxData
