/* eslint-disable react/jsx-props-no-spreading */
import { mount } from 'enzyme'
import React from 'react'

import * as Classes from '../../../../common/classes'
import Component from '../Modal'

let onClose
let wrapper

const tests = describe('Modal', () => {
  beforeEach(() => {
    onClose = jest.fn()
    const story = (
      <div className='container'>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, impedit. Sit, aperiam.</div>
        <Component
          isOpen
          onClose={onClose}
          closeOnEscapeClick
          closeOnOutsideClick
        >Lorem, ipsum.
        </Component>
      </div>
    )
    wrapper = mount(story)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Should call onClose prop when close button is clicked', () => {
    const selector = 'button.close-button'

    wrapper.find(selector).simulate('click')

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Should call onClose prop when clicked outside of modal', () => {
    const selector = `.${`${Classes.MODAL}__container`}`
    const modalSelector = `.${Classes.MODAL}`

    // click inside modal
    wrapper.find(modalSelector).simulate('click')
    expect(onClose).toHaveBeenCalledTimes(0)

    // click outside modal
    wrapper.find(selector).simulate('click')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Should call onClose prop when escape key is pressed', () => {
    const selector = 'button.close-button'

    wrapper.find(selector).simulate('keydown', { key: 'Enter' })
    expect(onClose).toHaveBeenCalledTimes(0)

    wrapper.find(selector).simulate('keydown', { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

export default tests
