import React, { memo } from 'react'
import { Route, Switch } from 'react-router-dom'

import Notifications from '../../containers/Notifications'
import withI18nProvider from '../../hoc/withI18nProvider'
import withResponsive from '../../hoc/withResponsive'
import { MOVEMENT_TYPES } from '../../utils/movements'
import Movements from './Movements'
import NewMovement from './NewMovement'

const MovementsRoutes = () => (
  <>
    <Switch>
      <Route exact path={`/${MOVEMENT_TYPES.DEPOSITS}`} component={Movements} />
      <Route
        path={`/${MOVEMENT_TYPES.DEPOSITS}/:subType/:baseCcy`}
        // eslint-disable-next-line react/jsx-props-no-spreading
        render={(props) => (<NewMovement movementType={MOVEMENT_TYPES.DEPOSITS} {...props} />)}
      />

      <Route exact path={`/${MOVEMENT_TYPES.WITHDRAWALS}`} component={Movements} />
      <Route
        path={`/${MOVEMENT_TYPES.WITHDRAWALS}/:subType/:baseCcy`}
        // eslint-disable-next-line react/jsx-props-no-spreading
        render={(props) => (<NewMovement movementType={MOVEMENT_TYPES.WITHDRAWALS} {...props} />)}
      />
    </Switch>
    <Notifications />
  </>
)

export default withI18nProvider(withResponsive(memo(MovementsRoutes)))
