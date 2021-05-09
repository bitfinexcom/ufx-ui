/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import { shallow } from 'enzyme'
import React from 'react'

import Component from '../Checkbox'

const tests = describe('Checkbox', () => {
  it('Should call onChange prop when checkbox is clicked', () => {
    const onChange = jest.fn()
    const id = 'test-cb'
    let checked = false
    const story = (
      <Component
        id={id}
        checked={checked}
        onChange={onChange}
        label='Test'
      />
    )
    checked = true
    const wrapper = shallow(story)
    const e = {
      target: { checked },
    }
    wrapper.find(`#${id}`).simulate('change', e)
    expect(onChange).toHaveBeenCalledWith(checked, e)
  })
})

export default tests
