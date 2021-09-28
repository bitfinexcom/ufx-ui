import { Classes } from '@ufx-ui/core'
import React, { memo } from 'react'
import { Switch } from 'react-router-dom'

import { MovementsPage } from '../../Movements'
import { TradingPage } from '../../Trading'
import Footer from '../Footer'
// import Header from '../Header'

const Layout = ({ history }) => (
  <div className={Classes.LAYOUT}>
    <Switch>
      {/* <Header history={history} /> */}
    </Switch>
    <div className={`${Classes.LAYOUT}__body`}>
      <TradingPage />
      <MovementsPage />
    </div>
    <Switch>
      <Footer history={history} />
    </Switch>
  </div>
)

export default memo(Layout)
