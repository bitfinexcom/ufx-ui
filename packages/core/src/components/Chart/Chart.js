import PropTypes from 'prop-types'
import React from 'react'

const CHART_URL = 'https://bitfinexcom.github.io/bfx-hf-tradingview'

const Chart = ({ market: { wsID, base, quote } }) => {
  const queryString = new URLSearchParams({
    wsID,
    base,
    quote,
    apiBaseUrl: 'https://api-pub.bitfinex.com',
  }).toString()

  return (
    <iframe
      className='hfui-chart-iframe'
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
