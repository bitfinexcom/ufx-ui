import React, { memo } from 'react'
import { Route, Switch } from 'react-router-dom'

import Trading from './Trading.container'

const TradingRoutes = () => (
  <Switch>
    <Route exact path='/' component={Trading} />
    <Route path='/t/:pair?' component={Trading} />
    <Route path='/trading/:pair?' component={Trading} />
  </Switch>
)

export default memo(TradingRoutes)
