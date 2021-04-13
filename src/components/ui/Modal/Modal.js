import cx from 'classnames'
import FocusTrap from 'focus-trap-react'
import PropTypes from 'prop-types'
import React, { useRef, useEffect, forwardRef } from 'react'
import { createPortal } from 'react-dom'

import * as Classes from '../../../common/classes'
import * as utils from '../../../common/utils'
import ModalHeader from './ModalHeader'

const toggleScrollLock = () => {
  document.querySelector('body').classList.toggle('scroll-lock')
}

// eslint-disable-next-line prefer-arrow-callback
const Modal = forwardRef(function Modal(props, ref) {
  const {
    isOpen,
    title,
    children,
    onClose,
    className,
    closeOnOutsideClick,
    closeOnEscapeClick,
  } = props
  const modalRef = useRef(null)
  const classes = cx(`${Classes.MODAL}__container`, className)

  const closeModal = () => {
    toggleScrollLock()
    onClose()
  }

  const onClickOutside = event => {
    if (modalRef && modalRef.current.contains(event.target)) return
    closeModal()
  }

  useEffect(() => {
    if (isOpen) {
      toggleScrollLock()
    }
  }, [isOpen])

  const containerProps = {
    onClick: !closeOnOutsideClick ? null : onClickOutside,
    onKeyDown: !closeOnEscapeClick ? null : utils.handleKeyboardEvent(
      'Escape',
      closeModal,
    ),
  }

  return (!isOpen ? null
    : createPortal(
      <FocusTrap ref={ref}>
        <div
          role='dialog'
          tabIndex='-1'
          aria-modal='true'
          className={classes}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...containerProps}
        >
          <div className={Classes.MODAL} ref={modalRef}>
            <ModalHeader
              closeModal={closeModal}
              title={title}
            />
            <div className='content'>
              {children}
            </div>
          </div>
        </div>
      </FocusTrap>,
      document.body,
    )
  )
})

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  closeOnOutsideClick: PropTypes.bool,
  closeOnEscapeClick: PropTypes.bool,
}

Modal.defaultProps = {
  title: null,
  className: null,
  closeOnOutsideClick: false,
  closeOnEscapeClick: false,
}

export default Modal
