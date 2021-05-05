import { MarketList } from '@ufx-ui/core'
import { lastInPair } from '@ufx-ui/utils'
import PropTypes from 'prop-types'
import React, { useState, useMemo, memo } from 'react'

import { getCcyTabs, prepareTickers } from './MarketList.helpers'

const MarketListWrapper = (props) => {
  const {
    tickers,
    tradingTickerKeys,
    getCurrencySymbol,
    ...rest
  } = props

  const [favs, setFavs] = useState({})

  const tabs = useMemo(() => getCcyTabs(tradingTickerKeys, lastInPair, getCurrencySymbol), [tradingTickerKeys, getCurrencySymbol])
  const data = prepareTickers(tradingTickerKeys, tickers, getCurrencySymbol)

  return (
    <MarketList
      data={data}
      tabs={tabs}
      favs={favs}
      saveFavs={setFavs}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
}

MarketListWrapper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  tickers: PropTypes.object,
  tradingTickerKeys: PropTypes.arrayOf(PropTypes.string),
  getCurrencySymbol: PropTypes.func.isRequired,
}

MarketListWrapper.defaultProps = {
  tickers: {},
  tradingTickerKeys: [],
}

export default memo(MarketListWrapper)
