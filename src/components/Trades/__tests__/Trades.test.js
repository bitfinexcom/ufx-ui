/* eslint-disable react/jsx-props-no-spreading */
import { mount } from 'enzyme'
import React from 'react'

import { StoreProvider } from '../../../store'
import { Trades as Component, ButtonTradesToggle } from '../index'

let pair = 'tBTCUSD'
let wrapper
let subscribe
let unsubscribe
const toggle = jest.fn()

const tests = describe('Trades', () => {
  beforeEach(() => {
    subscribe = jest.fn()
    unsubscribe = jest.fn()

    const story = (
      <Component
        loading={false}
        online
        pair={pair}
        subscribe={subscribe}
        unsubscribe={unsubscribe}
      />
    )
    wrapper = mount(story)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Should call subscribe/unsubscribe on prop(online) change', () => {
    // assert after mount with online=true
    // check if no prop change
    wrapper.setProps({ online: true })
    wrapper.update()
    expect(subscribe).toHaveBeenCalledTimes(1)
    expect(unsubscribe).toHaveBeenCalledTimes(1)

    // change online prop
    wrapper.setProps({ online: false })
    expect(subscribe).toHaveBeenCalledTimes(1)
    expect(unsubscribe).toHaveBeenCalledTimes(1)
  })

  it('Should call subscribe/unsubscribe on prop(pair) change', () => {
    expect(subscribe).toHaveBeenCalledWith(pair)
    pair = 'tEOSUSD'
    wrapper.setProps({ pair })

    expect(unsubscribe).toHaveBeenCalledWith()
    expect(subscribe).toHaveBeenCalledWith('tEOSUSD')
  })
})

describe('ButtonTradesToggle', () => {
  it('should call toggle when clicked', () => {
    const story = (
      <StoreProvider>
        <ButtonTradesToggle
          authenticated
          isMarket
          toggle={toggle}
        />
      </StoreProvider>
    )
    wrapper = mount(story)

    wrapper.find('.ufx-button').simulate('click')

    expect(toggle).toHaveBeenCalledTimes(1)
    expect(toggle).toHaveBeenCalledWith(false)

    wrapper.unmount()
  })
})

export default tests
