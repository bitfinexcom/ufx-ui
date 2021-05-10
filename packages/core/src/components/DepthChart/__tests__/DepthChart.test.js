/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { mount } from 'enzyme'
import React from 'react'

import { DepthChart } from '../DepthChart'
import DepthChartCanvas from '../DepthChart.canvas'
import {
  asks, bids, tAsks, tBids, pAsks, pBids,
} from '../stories/DepthChart.stories_data'

jest.mock('../DepthChart.canvas')

const props = {
  asks,
  bids,
  tAsks,
  tBids,
  pAsks,
  pBids,
  width: 500,
  height: 180,
  online: true,
  zoom: 50,
  updateZoom: () => {},
  currentPair: 'BTC/UST',
  theme: 'eosfinex-dark-theme',
}

const tests = describe('DepthChart', () => {
  let wrapper
  const constructorSpy = jest.spyOn(DepthChartCanvas.prototype, 'constructor')
  const renderSpy = jest.spyOn(DepthChartCanvas.prototype, 'render')

  beforeEach(async () => {
    React.useEffect = jest.fn().mockImplementation(f => f())
    wrapper = mount(<DepthChart {...props} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render the chart correctly', () => {
    expect(constructorSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        asksColor: '#D22A42',
        axisColor: '#8a9ba8',
        bgColor: '#182A39',
        bidsColor: '#3DCC91',
        fontColor: '#a7b6c2',
        highlightColor: '#ffffff',
        initialZoom: 50,
      }),
    )

    expect(renderSpy).toHaveBeenCalledWith({
      bids: props.bids,
      tBids: props.tBids,
      pBids: props.pBids,
      asks: props.asks,
      tAsks: props.tAsks,
      pAsks: props.pAsks,
      zoom: props.zoom,
    })
  })
})

export default tests
