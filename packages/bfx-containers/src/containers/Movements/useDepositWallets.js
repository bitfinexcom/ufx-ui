import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useInjectSaga } from 'redux-injectors'

import { BTC_LIGHTNING_TX_METHOD } from './constants'
import { requestDepositWallets } from '../../redux/actions/movements.actions'
import { MOVEMENTS_REDUCER_SAGA_KEY } from '../../redux/constants/movements.constants'
import movementsSaga from '../../redux/sagas/movements.saga'
import { getCurrencyTxMethod as getCurrencyTxMethodSelector } from '../../redux/selectors/currencies.selectors'
import { getDepositWallets } from '../../redux/selectors/movements.selectors'

const SUPPORTED_WALLETS = ['exchange']

const useDepositWallets = (currency, defaultTxMethod = null) => {
  useInjectSaga({ key: MOVEMENTS_REDUCER_SAGA_KEY, saga: movementsSaga })

  const getCurrencyTxMethod = useSelector(getCurrencyTxMethodSelector)
  const txMethod = getCurrencyTxMethod(currency, defaultTxMethod)
  const dispatch = useDispatch()

  const wallets = useSelector(state => getDepositWallets(state, currency))
  useEffect(() => {
    if (txMethod && txMethod !== BTC_LIGHTNING_TX_METHOD) {
      dispatch(requestDepositWallets({ wallets: SUPPORTED_WALLETS, method: txMethod, currency }))
    }
  }, [dispatch, txMethod, currency])

  return wallets
}

export default useDepositWallets
