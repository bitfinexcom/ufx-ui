import React, { useCallback, useState } from 'react'

import {
  showTemplateStory,
  getDefaultMetadata,
} from '../../../../../../storybook/.storybook/helper'
import Modal from '../../Dialog'
import Button, { EditLayoutButton } from '../EditLayoutButton'

export default getDefaultMetadata(
  EditLayoutButton,
  'Components/ui/EditLayoutButton',
)

const Component = () => {
  const [isShowingModal, setModalShowing] = useState(false)

  const onClose = useCallback(() => setModalShowing(false), [])

  return (
    <>
      <Button
        layoutIsEditable={isShowingModal}
        enableEditLayout={() => setModalShowing(true)}
        closeEditLayout={onClose}
      />
      <Modal
        title='Edit Layout Modal'
        isOpen={isShowingModal}
        onClose={onClose}
      >
        Here you can edit layout
        <Modal.Footer>
          <Modal.Button primary onClick={onClose}>
            OK
          </Modal.Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export const basic = showTemplateStory(Component, {})
