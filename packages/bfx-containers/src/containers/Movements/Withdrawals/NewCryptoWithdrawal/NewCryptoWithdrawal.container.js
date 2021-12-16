import { defaultBaseCcy } from '@ufx-ui/utils'
import _identity from 'lodash/identity'
import _pickBy from 'lodash/pickBy'
import _toUpper from 'lodash/toUpper'
import PropTypes from 'prop-types'
import React, { memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useInjectSaga } from 'redux-injectors'

import { requestNewWithdraw as requestNewWithdrawAction } from '../../../../redux/actions/movements.actions'
import { MOVEMENTS_REDUCER_SAGA_KEY } from '../../../../redux/constants/movements.constants'
import movementsSaga from '../../../../redux/sagas/movements.saga'
import {
  getHasPaymentIdForWithdrawals,
  getIsWithdrawalActive,
  getCurrencyLabel,
  getCurrencySymbolMemo,
  getCurrencyTxMethod,
} from '../../../../redux/selectors/currencies.selectors'
import { getWSIsAuthenticated } from '../../../../redux/selectors/ws.selectors'
import NewCryptoWithdrawal from './NewCryptoWithdrawal'

const NewCryptoWithdrawalContainer = (props) => {
  useInjectSaga({ key: MOVEMENTS_REDUCER_SAGA_KEY, saga: movementsSaga })
  const { baseCcy } = props
  const currency = _toUpper(baseCcy)

  const isAuthenticated = useSelector(getWSIsAuthenticated)
  const dispatch = useDispatch()
  const requestNewWithdraw = useCallback(
    (payload) => {
      const action = requestNewWithdrawAction(_pickBy(payload, _identity))
      dispatch(action)
    },
    [dispatch],
  )

  return (
    <NewCryptoWithdrawal
      currency={currency}
      loading={!isAuthenticated}
      hasPaymentIdForWithdrawals={useSelector(getHasPaymentIdForWithdrawals)}
      getIsWithdrawalActive={useSelector(getIsWithdrawalActive)}
      getCurrencyLabel={useSelector(getCurrencyLabel)}
      getCurrencySymbol={useSelector(getCurrencySymbolMemo)}
      getCurrencyTxMethod={useSelector(getCurrencyTxMethod)}
      requestNewWithdraw={requestNewWithdraw}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

NewCryptoWithdrawalContainer.propTypes = {
  baseCcy: PropTypes.string,
}

NewCryptoWithdrawalContainer.defaultProps = {
  baseCcy: defaultBaseCcy,
}

export default memo(NewCryptoWithdrawalContainer)
