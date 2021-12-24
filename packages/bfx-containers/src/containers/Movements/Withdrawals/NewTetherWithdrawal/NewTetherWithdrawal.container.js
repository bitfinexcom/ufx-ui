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
  getTetherProtocolToCcyMapping,
} from '../../../../redux/selectors/currencies.selectors'
import { getWSIsAuthenticated } from '../../../../redux/selectors/ws.selectors'
import { getTetherProtocols } from '../../Tether.helpers'
import NewTetherWithdrawal from './NewTetherWithdrawal'

const NewTetherWithdrawalContainer = (props) => {
  const { baseCcy } = props
  const currency = _toUpper(baseCcy)

  useInjectSaga({ key: MOVEMENTS_REDUCER_SAGA_KEY, saga: movementsSaga })

  const isAuthenticated = useSelector(getWSIsAuthenticated)
  const tetherProtocolCcyMapping = useSelector(getTetherProtocolToCcyMapping)
  const tetherProtocols = getTetherProtocols(tetherProtocolCcyMapping, currency)

  const dispatch = useDispatch()
  const requestNewWithdraw = useCallback(
    (payload) => {
      const action = requestNewWithdrawAction(_pickBy(payload, _identity))
      dispatch(action)
    },
    [dispatch],
  )

  return (
    <NewTetherWithdrawal
      currency={currency}
      loading={!isAuthenticated}
      tetherProtocols={tetherProtocols}
      hasPaymentIdForWithdrawals={useSelector(getHasPaymentIdForWithdrawals)}
      getIsWithdrawalActive={useSelector(getIsWithdrawalActive)}
      getCurrencyLabel={useSelector(getCurrencyLabel)}
      getCurrencySymbol={useSelector(getCurrencySymbolMemo)}
      tetherProtocolCcyMapping={useSelector(getTetherProtocolToCcyMapping)}
      requestNewWithdraw={requestNewWithdraw}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

NewTetherWithdrawalContainer.propTypes = {
  baseCcy: PropTypes.string,
}

NewTetherWithdrawalContainer.defaultProps = {
  baseCcy: defaultBaseCcy,
}

export default memo(NewTetherWithdrawalContainer)
