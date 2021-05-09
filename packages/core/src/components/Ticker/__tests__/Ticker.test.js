/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import { mount } from 'enzyme'
import React from 'react'

import { StoreProvider } from '../../../store'
import { ticker } from '../stories/Ticker.stories_data'
import Component from '../Ticker'

const selector = {
  infoIcon: 'button.info-icon',
}
const onShowInfoClick = jest.fn()

let wrapper

const tests = describe('Ticker', () => {
  beforeEach(() => {
    const story = (
      <StoreProvider>
        <Component
          data={ticker}
          showCoinInfoIcon
          onShowInfoClick={onShowInfoClick}
        />
      </StoreProvider>
    )
    wrapper = mount(story)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Should call onShowInfoClick prop when coin info icon is clicked', () => {
    wrapper.find(selector.infoIcon).simulate('click')
    expect(onShowInfoClick).toHaveBeenCalledTimes(1)
  })
})

export default tests
