import { Classes } from '@ufx-ui/core'
import React, { memo } from 'react'

import Trades from './Trades.container'
import TradesToggle from './TradesToggle.container'

const TradesWrapper = (props) => (
  <div className={Classes.RIGHT_TO_LEFT}>
    <TradesToggle />
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Trades {...props} />
  </div>
)

export default memo(TradesWrapper)
