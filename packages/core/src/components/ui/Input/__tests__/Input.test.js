/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { shallow } from 'enzyme'
import React from 'react'

import Component from '../Input'

const tests = describe('Input', () => {
  it('Should call onChange prop when input is changed', () => {
    const onChange = jest.fn()
    const id = 'test-input'
    const story = (
      <Component
        id={id}
        onChange={onChange}
      />
    )
    const value = 'test string'
    const wrapper = shallow(story)
    const e = {
      target: { value },
    }
    wrapper.find(`#${id}`).simulate('change', e)
    expect(onChange).toHaveBeenCalledWith(value, e)
  })
})

export default tests
