/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { shallow } from 'enzyme'
import React from 'react'

import { Button } from '../Button'

const tests = describe('Button', () => {
  it('Should call onClick prop when button is clicked', () => {
    const onClick = jest.fn()
    const id = 'test-button'
    const story = <Button id={id} onClick={onClick}>Test</Button>
    const wrapper = shallow(story)
    wrapper.find(`#${id}`).simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

export default tests
