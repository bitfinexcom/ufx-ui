/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import { mount } from 'enzyme'
import React from 'react'

import * as Classes from '../../../../common/classes'
import Component from '../Dropdown'

const data = {
  options: {
    btc: 'Bitcoin',
    eth: 'Ethereum',
  },
  value: 'btc',
}

const tests = describe('Dropdown', () => {
  it('Should call onChange prop when dropdown value is changed', () => {
    const onChange = jest.fn()
    const id = 'test-dropdown'
    const story = (
      <Component
        id={id}
        onChange={onChange}
        {...data}
      />
    )
    let value = 'eth'
    const wrapper = mount(story)

    // click to open dropdown list
    wrapper.find(`.${Classes.DROPDOWN} #${id}`).simulate('click')
    expect(wrapper.exists('.list')).toEqual(true)

    // verify using click
    wrapper.find(`.list-item[value="${value}"]`).simulate('click')
    expect(onChange).toHaveBeenCalledWith(value)

    // verify using keypress
    value = 'btc'
    wrapper.find(`.${Classes.DROPDOWN} #${id}`).simulate('click')
    wrapper.find(`.list-item[value="${value}"]`).simulate('keypress', { key: 'Enter' })
    expect(onChange).toHaveBeenCalledWith(value)

    // close dropdown list
    wrapper.find(`.${Classes.DROPDOWN}`).simulate('mouseleave')
    expect(wrapper.exists('.list')).toEqual(false)

    wrapper.unmount()
  })
})

export default tests
