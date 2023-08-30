import { Classes } from '@ufx-ui/core'
import { defaultBaseCcy, defaultQuoteCcy } from '@ufx-ui/utils'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { CHART_URL, DEFAULT_THEME } from './Chart.constants'
import { corsProxyUrl as proxyURL } from '../../functions/config.selectors'
import useCommonBfxData from '../../hooks/useCommonBfxData'

const ChartContainer = ({
  baseCcy, quoteCcy, theme, env,
}) => {
  const { symbol } = useCommonBfxData(baseCcy, quoteCcy)

  const queryString = new URLSearchParams({
    wsID: symbol,
    base: baseCcy,
    quote: quoteCcy,
    theme: theme || DEFAULT_THEME,
    proxyURL,
    env,
  }).toString()

  return (
    <iframe
      className={Classes.CHART}
      src={`${CHART_URL}/?${queryString}`}
      title='thumbnails'
    />
  )
}

ChartContainer.propTypes = {
  /**
   * The base currency of the chart.
   */
  baseCcy: PropTypes.string,
  /**
   * The quote currency of the chart.
   */
  quoteCcy: PropTypes.string,
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
  /**
   * The environment of the chart.
   */
  env: PropTypes.oneOf([
    'staging',
    'electron',
    'production',
  ]),
}

ChartContainer.defaultProps = {
  baseCcy: defaultBaseCcy,
  quoteCcy: defaultQuoteCcy,
  theme: DEFAULT_THEME,
  env: 'production',
}

export default memo(ChartContainer)
