import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component, { Ticker, defaultProps } from '../Ticker'
import { ticker } from './Ticker.stories_data'

export default getDefaultMetadata(Ticker, 'Components/Ticker')

const props = {
  ...defaultProps,
  data: ticker,
  showCoinInfoIcon: true,
  ccyIcon: <FontAwesomeIcon icon={faCoins} />,
  // eslint-disable-next-line no-alert
  onShowInfoClick: () => alert('on show info click'),
}

export const basic = showTemplateStory(Component, props)
