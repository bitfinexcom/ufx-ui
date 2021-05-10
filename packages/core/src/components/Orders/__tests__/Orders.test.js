/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { mount } from 'enzyme'
import React from 'react'

import { StoreProvider } from '../../../store'
import Component from '../Orders'
import data from '../stories/Orders.stories_data'

const tests = describe('Orders', () => {
  it('Should call canelOrder prop when cancel button is clicked', () => {
    const cancelOrder = jest.fn()
    const selector = '.ufx-orders table tbody tr'
    const story = (
      <StoreProvider>
        <Component
          orders={data}
          cancelOrder={cancelOrder}
        />
      </StoreProvider>
    )
    const wrapper = mount(story)
    const tr = wrapper.find(selector).first()
    const btn = tr.find('button')
    btn.simulate('click')

    expect(cancelOrder).toHaveBeenCalledTimes(1)
    expect(cancelOrder).toHaveBeenCalledWith(data[0].id, data[0])

    wrapper.unmount()
  })
})

export default tests
