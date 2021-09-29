import PropTypes from 'prop-types'
import React from 'react'

import * as Classes from '../../common/classes'

const CHART_URL = 'https://bitfinexcom.github.io/bfx-hf-tradingview'
// const CHART_URL = 'http://localhost:3001/bfx-hf-tradingview'

const Chart = ({ market: { wsID, base, quote } }) => {
  const queryString = new URLSearchParams({
    wsID,
    base,
    quote,
    apiBaseUrl: 'https://api-pub.bitfinex.com',
    theme: 'default-theme:light-mode',
  }).toString()

  return (
    <iframe
      className={Classes.CHART}
      src={`${CHART_URL}/?${queryString}`}
      title='thumbnails'
    />
  )
}

Chart.propTypes = {
  market: PropTypes.shape({
    wsID: PropTypes.string,
    base: PropTypes.string,
    quote: PropTypes.string,
  }),
}

Chart.defaultProps = {
  market: {
    base: 'BTC',
    quote: 'USD',
    wsID: 'tBTCUSD',
  },
}

export default React.memo(Chart)
