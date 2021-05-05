import { TickerList } from '@ufx-ui/core'
import PropTypes from 'prop-types'
import React, { useState, memo } from 'react'

import { ROW_MAPPING } from './TickerList.constants'
import { prepareTickers, getVolumeUnitList, getDefaultVolumeUnit } from './TickerList.helpers'

const TickerListWrapper = (props) => {
  const {
    tickers,
    tradingTickerKeys,
    getCurrencySymbol,
    getTickerSymbol,
    isPaperTrading,
    ...rest
  } = props

  const [favs, setFavs] = useState({})
  const [volumeUnit, setVolumeUnit] = useState(getDefaultVolumeUnit(isPaperTrading))
  const [showOnlyFavs, setShowOnlyFavs] = useState(false)

  const data = prepareTickers(tradingTickerKeys, tickers, volumeUnit, getCurrencySymbol, getTickerSymbol)
  const volumeUnitList = getVolumeUnitList(isPaperTrading)

  return (
    <TickerList
      data={data}
      rowMapping={ROW_MAPPING}
      showVolumeUnit
      volumeUnitList={volumeUnitList}
      volumeUnit={volumeUnit}
      setVolumeUnit={setVolumeUnit}
      favs={favs}
      saveFavs={setFavs}
      showOnlyFavs={showOnlyFavs}
      setShowOnlyFavs={setShowOnlyFavs}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
}

TickerListWrapper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  tickers: PropTypes.object,
  tradingTickerKeys: PropTypes.arrayOf(PropTypes.string),
  getCurrencySymbol: PropTypes.func.isRequired,
  getTickerSymbol: PropTypes.func.isRequired,
}

TickerListWrapper.defaultProps = {
  tickers: {},
  tradingTickerKeys: [],
}

export default memo(TickerListWrapper)
