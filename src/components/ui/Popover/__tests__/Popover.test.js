/* eslint-disable react/jsx-props-no-spreading */
import { mount } from 'enzyme'
import React, { useState } from 'react'
import { act } from 'react-dom/test-utils'
import { config as reactTransitionGroupConfig } from 'react-transition-group'

import Popover from '..'

reactTransitionGroupConfig.disabled = true

const tests = describe('Popover', () => {
  let wrapper

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render the popover content', async () => {
    await act(async () => {
      wrapper = mount(
        <Popover content={<div id='b' />}>
          <div id='a' />
        </Popover>,
      )

      // wait for portal mount
      await new Promise(r => setTimeout(r, 100))

      expect(document.getElementById('b')).toBeFalsy()

      wrapper.find('#a').simulate('click')

      expect(document.getElementById('b')).toBeTruthy()
    })
  })

  it('should call onInteraction correctly', async () => {
    const onInteraction = jest.fn()

    await act(async () => {
      wrapper = mount(
        <Popover content={<div id='b' />} onInteraction={onInteraction}>
          <div id='a' />
        </Popover>,
      )

      // wait for portal mount
      await new Promise(r => setTimeout(r, 100))

      wrapper.find('#a').simulate('click')

      expect(onInteraction).toHaveBeenCalledWith(true)
    })
  })

  it('should behave as a controlled component correctly', async () => {
    await act(async () => {
      const ControllerPopover = () => {
        const [isOpen, setIsOpen] = useState(false)

        return (
          <Popover content={<div id='b' />} isOpen={isOpen} onInteraction={() => setIsOpen(!isOpen)}>
            <div id='a' />
          </Popover>
        )
      }

      wrapper = mount(<ControllerPopover />)

      // wait for portal mount
      await new Promise(r => setTimeout(r, 100))

      wrapper.find('#a').simulate('click')

      // wait for popover mount
      await new Promise(r => setTimeout(r, 100))

      expect(document.getElementById('b')).toBeTruthy()
    })
  })
})

export default tests
