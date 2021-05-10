import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component, { Trades, defaultProps } from '../Trades'
import { market, user } from './Trades.stories_data'

const props = {
  ...defaultProps,
  online: true,
  loading: false,
  pair: 'tBTCUSD',
  market,
  user,
}

export default getDefaultMetadata(Trades, 'Components/Trades')

export const basic = showTemplateStory(Component, props)

export const loading = showTemplateStory(Component, {
  pair: props.pair,
  loading: true,
})

export const offline = showTemplateStory(Component, {
  pair: props.pair,
  offline: true,
})

export const emptyTrades = showTemplateStory(Component, {
  ...props,
  market: {},
})
