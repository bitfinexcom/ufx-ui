/* eslint-disable react/jsx-props-no-spreading */
import { shallow } from 'enzyme'
import React from 'react'

import Component from '../Button'

const tests = describe('Button', () => {
  it('Should call onClick prop when button is clicked', () => {
    const onClick = jest.fn()
    const id = 'test-button'
    const story = <Component id={id} onClick={onClick}>Test</Component>
    const wrapper = shallow(story)
    wrapper.find(`#${id}`).simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

export default tests
