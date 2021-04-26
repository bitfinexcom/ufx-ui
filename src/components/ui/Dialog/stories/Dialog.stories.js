/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'

import { getDefaultMetadata, showTemplateStory } from '../../../../../.storybook/helper'
import Dialog from '../Dialog.Wrapper'

function DialogWithButton({ children, ...props }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button type='button' onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} {...props}>
        {children}
      </Dialog>
    </>
  )
}

const Component = () => (
  <DialogWithButton title='My Dialog'>
    My Dialog Content
    <Dialog.Footer>
      <Dialog.Button primary>
        Okay
      </Dialog.Button>
    </Dialog.Footer>
  </DialogWithButton>
)

export default getDefaultMetadata(Component, 'Components/ui/Dialog', {}, true)

export const basic = showTemplateStory(Component, Dialog.defaultProps)

export const canNotClose = showTemplateStory(() => (
  <DialogWithButton
    title='My Dialog'
    canOutsideClickClose={false}
    isCloseButtonShown={false}
    canEscapeKeyClose={false}
  >
    My Dialog Content
    <Dialog.Footer>
      <Dialog.Button primary>
        Okay
      </Dialog.Button>
      <Dialog.Button secondary>
        Cancel
      </Dialog.Button>
    </Dialog.Footer>
  </DialogWithButton>
))

export const fullscreenWithStickyFooter = showTemplateStory(() => (
  <DialogWithButton
    title='My Dialog'
    canOutsideClickClose={false}
    isCloseButtonShown={false}
    canEscapeKeyClose={false}
    isFullscreenInMobile
    hasStickyFooterInMobile
  >
    My Dialog Content1
    <Dialog.Footer>
      <Dialog.Button primary>
        Okay
      </Dialog.Button>
      <Dialog.Button secondary>
        Cancel
      </Dialog.Button>
    </Dialog.Footer>
  </DialogWithButton>
))
