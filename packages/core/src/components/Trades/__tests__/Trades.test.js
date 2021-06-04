/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { mount } from 'enzyme'
import React from 'react'

import { StoreProvider } from '../../../store'
import { ButtonTradesToggle } from '../index'

let wrapper
const toggle = jest.fn()

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
