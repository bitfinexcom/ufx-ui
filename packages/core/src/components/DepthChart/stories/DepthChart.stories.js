/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import {
  asks, bids, tAsks, tBids, pAsks, pBids,
} from './DepthChart.stories_data'
import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component, { DepthChart, defaultProps } from '../DepthChart'

export default getDefaultMetadata(DepthChart, 'Components/DepthChart')

const props = {
  ...defaultProps,
  asks,
  bids,
  tAsks,
  tBids,
  pAsks,
  pBids,
  tAsksTop: {},
  tBidsTop: {},
  pBidsTop: [],
  pAsksTop: [],
  asksTop: {},
  bidsTop: {},
  currentPair: 'BTC/USD',
  online: true,
  zoom: 25,
  fontFamily: '"Helvetica Neue"',
  updateZoom: () => {},
}

export const basic = showTemplateStory(Component, props)

export const loading = showTemplateStory(Component, {
  ...props,
  loading: true,
})
