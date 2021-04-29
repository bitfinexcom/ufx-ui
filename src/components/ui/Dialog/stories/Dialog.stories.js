/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'

import { getDefaultMetadata, showTemplateStory } from '../../../../../.storybook/helper'
import Dialog from '../Dialog.Wrapper'

function useToggle() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const onClose = () => setIsOpen(false)

  return [toggle, { isOpen, onClose }]
}

const Component = () => {
  const [toggle, { isOpen, onClose }] = useToggle()

  return (
    <>
      <button type='button' onClick={toggle}>Toggle</button>
      <Dialog title='My Dialog' {...{ isOpen, onClose }}>
        My Dialog Content
        <Dialog.Footer>
          <Dialog.Button primary onClick={onClose}>
            Okay
          </Dialog.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

export default getDefaultMetadata(Component, 'Components/ui/Dialog', {}, true)

export const basic = showTemplateStory(Component, Dialog.defaultProps)

export const canNotClose = showTemplateStory(() => {
  const [toggle, { isOpen, onClose }] = useToggle()

  return (
    <>
      <button type='button' onClick={toggle}>Toggle</button>
      <Dialog
        title='My Dialog'
        canOutsideClickClose={false}
        isCloseButtonShown={false}
        canEscapeKeyClose={false}
        {...{ isOpen, onClose }}
      >
        My Dialog Content
        <Dialog.Footer>
          <Dialog.Button primary onClick={onClose}>
            Okay
          </Dialog.Button>
          <Dialog.Button secondary onClick={onClose}>
            Cancel
          </Dialog.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
})

export const fullscreenWithStickyFooter = showTemplateStory(() => {
  const [toggle, { isOpen, onClose }] = useToggle()

  return (
    <>
      <button type='button' onClick={toggle}>Toggle</button>
      <Dialog
        title='My Dialog'
        canOutsideClickClose={false}
        isCloseButtonShown={false}
        canEscapeKeyClose={false}
        isFullscreenInMobile
        hasStickyFooterInMobile
        isOpen={isOpen}
        onClose={onClose}
      >
        My Dialog Content1
        <Dialog.Footer>
          <Dialog.Button primary onClick={onClose}>
            Okay
          </Dialog.Button>
          <Dialog.Button secondary onClick={onClose}>
            Cancel
          </Dialog.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
})
