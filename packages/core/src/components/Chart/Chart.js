import PropTypes from 'prop-types'
import React from 'react'

import * as Classes from '../../common/classes'

const CHART_URL = 'https://bitfinexcom.github.io/bfx-hf-tradingview'

const DEFAULT_THEME = 'default-theme:light-mode'

const Chart = ({
  market: {
    wsID,
    base,
    quote,
  },
  theme,
}) => {
  const queryString = new URLSearchParams({
    wsID,
    base,
    quote,
    apiBaseUrl: 'https://api-pub.bitfinex.com',
    theme: theme || DEFAULT_THEME,
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
  /**
   * The market to show on the chart.
   */
  market: PropTypes.shape({
    wsID: PropTypes.string,
    base: PropTypes.string,
    quote: PropTypes.string,
  }),
  /**
   * The theme of the chart.
   */
  theme: PropTypes.oneOf([
    'default-theme:dark-mode',
    'default-theme:light-mode',
    'classic-theme:dark-mode',
    'classic-theme:light-mode',
    'high-contrast-theme:light-mode',
    'colourblind-theme:dark-mode',
    'honeyframework-theme:dark-mode',
  ]),
}

Chart.defaultProps = {
  market: {
    base: 'BTC',
    quote: 'USD',
    wsID: 'tBTCUSD',
  },
  theme: DEFAULT_THEME,
}

export default React.memo(Chart)
