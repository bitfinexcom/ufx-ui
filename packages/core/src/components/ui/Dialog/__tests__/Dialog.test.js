/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { config as reactTransitionGroupConfig } from 'react-transition-group'

import Dialog from '..'
import Intent from '../../../../common/intent'
import Button from '../../Button'

reactTransitionGroupConfig.disabled = true

const tests = describe('Dialog', () => {
  let wrapper

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render into the dialog container correctly', async () => {
    await act(async () => {
      wrapper = mount(
        <Dialog isOpen onClose={() => {}}>
          <div id='a' />
        </Dialog>,
      )

      // wait for portal mount
      await new Promise(r => setTimeout(r, 100))

      const container = document.getElementById('dialog-container')

      expect(container).toBeTruthy()
      expect(container.querySelector('.background')).toBeTruthy()
      expect(container.querySelector('.modal')).toBeTruthy()
      expect(container.querySelector('.modal__close-button')).toBeTruthy()
      expect(container.querySelector('.modal__body')).toBeTruthy()
      expect(container.querySelector('#a')).toBeTruthy()
    })
  })

  it('should render the dialog title correctly', () => {
    const title = 'test title 123'

    wrapper = mount(
      <Dialog.Modal title={title} onClose={() => {}} />,
    )

    expect(wrapper.find('.modal__title')).toExist()
    expect(wrapper.find('.modal__title').text()).toBe(title)
  })

  it('should render the dialog icon correctly', () => {
    const Icon = () => <div id='icon' />

    wrapper = mount(
      <Dialog.Modal icon={<Icon />} onClose={() => {}} />,
    )

    expect(wrapper.exists(Icon)).toBeTruthy()
  })

  it('should not render the close button when isCloseButtonShown is false', () => {
    wrapper = mount(
      <Dialog.Modal isCloseButtonShown={false} onClose={() => {}} />,
    )

    expect(wrapper.find('.modal__close-button')).not.toExist()
  })

  describe('onClose', () => {
    it('should close on close button click', () => {
      const onClose = jest.fn()

      wrapper = mount(
        <Dialog.Modal onClose={onClose} isCloseButtonShown />,
      )

      wrapper.find('.modal__close-button').simulate('click')

      expect(onClose).toHaveBeenCalled()
    })

    it('should close on outside click', () => {
      const onClose = jest.fn()

      wrapper = mount(
        <Dialog.Modal onClose={onClose} canOutsideClickClose isCloseButtonShown />,
      )

      wrapper.find('.background').simulate('click')

      expect(onClose).toHaveBeenCalled()
    })

    it('should not close on outside click when canOutsideClickClose is false', () => {
      const onClose = jest.fn()

      wrapper = mount(
        <Dialog.Modal onClose={onClose} canOutsideClickClose={false} isCloseButtonShown />,
      )

      wrapper.find('.background').simulate('click')

      expect(onClose).not.toHaveBeenCalled()
    })

    it('should close on escape key press', async () => {
      const onClose = jest.fn()

      await act(async () => {
        wrapper = mount(
          <Dialog isOpen onClose={onClose} />,
        )

        // wait for useEffect
        await new Promise(r => setTimeout(r, 100))

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

        expect(onClose).toHaveBeenCalled()
      })
    })

    it('should not close on escape key press when canEscapeKeyClose is false', async () => {
      const onClose = jest.fn()

      await act(async () => {
        wrapper = mount(
          <Dialog isOpen onClose={onClose} canEscapeKeyClose={false} />,
        )

        // wait for useEffect
        await new Promise(r => setTimeout(r, 100))

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

        expect(onClose).not.toHaveBeenCalled()
      })
    })
  })

  describe('Dialog.Footer', () => {
    it('should render correctly', () => {
      wrapper = mount(
        <Dialog.Footer><div id='b' /></Dialog.Footer>,
      )

      expect(wrapper.find('.modal__footer')).toExist()
      expect(wrapper.find('#b')).toExist()
    })
  })

  describe('Dialog.Button', () => {
    it('should render the Button component correctly', () => {
      wrapper = mount(
        <Dialog.Button className='my-button' primary>click</Dialog.Button>,
      )

      expect(wrapper.find(Button)).toExist()
      expect(wrapper.find(Button).props().className).toBe('modal__button my-button')
      expect(wrapper.find(Button).props().intent).toBe(Intent.PRIMARY)
    })
  })
})

export default tests
