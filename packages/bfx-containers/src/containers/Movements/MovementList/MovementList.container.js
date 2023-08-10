import { MovementList, useInterval } from '@ufx-ui/core'
import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useInjectSaga } from 'redux-injectors'

import { MAPPING } from './MovementList.constants'
import { requestMovements } from '../../../redux/actions/movements.actions'
import { MOVEMENTS_REDUCER_SAGA_KEY } from '../../../redux/constants/movements.constants'
import movementsSaga from '../../../redux/sagas/movements.saga'
import { getMovements } from '../../../redux/selectors/movements.selectors'

const POLL_FOR_NEW_MOVEMENTS_INTERVAL = 1000 * 60 // 60s

const MovementsListContainer = () => {
  useInjectSaga({ key: MOVEMENTS_REDUCER_SAGA_KEY, saga: movementsSaga })

  const dispatch = useDispatch()
  // TODO: fetch max/all movements on view all page
  useInterval(() => dispatch(requestMovements()), POLL_FOR_NEW_MOVEMENTS_INTERVAL)

  return (
    <MovementList
      movements={useSelector(getMovements)}
      rowMapping={MAPPING}
    />
  )
}

export default memo(MovementsListContainer)
