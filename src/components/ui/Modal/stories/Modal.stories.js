/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'

import { showTemplateStory, getDefaultMetadata } from '../../../../../.storybook/helper'
import Modal from '../Modal'

export default getDefaultMetadata(Modal, 'Components/ui/Modal', {}, true)

const props = {
  title: 'Lorem, ipsum.',
  children: (
    <>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nobis eveniet ipsam qui iste corrupti quisquam, nulla excepturi hic dignissimos?
      </div>
      <ul>
        <li>Lorem, ipsum.</li>
        <li>Lorem, ipsum dolor.</li>
      </ul>
    </>
  ),
}

const ControlledComponent = (componentProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button type='button' onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        {...componentProps}
      />
    </>
  )
}

export const basic = showTemplateStory(ControlledComponent, props)
