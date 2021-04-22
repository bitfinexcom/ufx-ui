// import FocusTrap from 'focus-trap-react'
import PropTypes from 'prop-types'
import React, { useEffect, forwardRef } from 'react'
import { Transition } from 'react-transition-group'

import Portal from '../Portal'
import Modal from './Dialog.Modal'

// eslint-disable-next-line prefer-arrow-callback
const Dialog = forwardRef(function Dialog(props, ref) {
  const {
    children,
    isOpen,
    onClose,
    canEscapeKeyClose,
    canOutsideClickClose,
    className,
    icon,
    title,
    isCloseButtonShown,
    isFullscreenInMobile,
    hasStickyFooterInMobile,
    width,
    height,
    textAlign,
  } = props

  useEffect(() => {
    const handleKeydown = e => {
      if (e.key === 'Escape' && isOpen && canEscapeKeyClose) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [onClose, isOpen, canEscapeKeyClose])

  return (
    <Portal ref={ref} id='dialog-container' target={document.body}>
      <Transition
        in={isOpen}
        timeout={300}
        onEnter={node => node.offsetHeight}
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <Modal
            state={state}
            className={className}
            icon={icon}
            title={title}
            canOutsideClickClose={canOutsideClickClose}
            isCloseButtonShown={isCloseButtonShown}
            isFullscreenInMobile={isFullscreenInMobile}
            hasStickyFooterInMobile={hasStickyFooterInMobile}
            onClose={onClose}
            width={width}
            height={height}
            textAlign={textAlign}
          >
            {children}
          </Modal>
        )}
      </Transition>
    </Portal>
  )
})

Dialog.propTypes = {
  /**
   * Toggles the visibility of the overlay and its children.
   * This prop is required because the component is controlled.
   */
  isOpen: PropTypes.bool.isRequired,
  /**
   * A callback that is invoked when user interaction causes the overlay to close, such as
   * clicking on the overlay or pressing the `esc` key (if enabled).
   *
   * Receives the event from the user's interaction, if there was an event (generally either a
   * mouse or key event). Note that, since this component is controlled by the `isOpen` prop, it
   * will not actually close itself until that prop becomes `false`.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Title of the dialog. If provided, an element with `Classes.DIALOG_HEADER`
   * will be rendered inside the dialog before any children elements.
   */
  title: PropTypes.node,
  /**
   * An icon element to render in the dialog's header. Note that the header
   * will only be rendered if `title` is provided.
   */
  icon: PropTypes.node,
  /**
   * Whether to show the close button in the dialog's header.
   * Note that the header will only be rendered if `title` is provided.
   */
  isCloseButtonShown: PropTypes.bool,
  /**
   * Whether pressing the `esc` key should invoke `onClose`.
   */
  canEscapeKeyClose: PropTypes.bool,
  /**
   * Whether clicking outside the overlay element (either on backdrop when present or on document)
   * should invoke `onClose`.
   */
  canOutsideClickClose: PropTypes.bool,
  /**
   * Whether to show the modal in fullscreen mode on mobile.
   */
  isFullscreenInMobile: PropTypes.bool,
  /**
   * Whether to show the footer in fullscreen mode on mobile fixed to the bottom.
   */
  hasStickyFooterInMobile: PropTypes.bool,

  /**
   * A space-delimited list of class names to pass along to a child element.
   */
  className: PropTypes.string,

  /**
   * Determines the max width of the dialog in desktop.
   */
  width: PropTypes.number,

  /**
   * Determines the max height of the dialog in desktop.
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Determines the text alignment of the dialog
   */
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
}

Dialog.defaultProps = {
  icon: null,
  isCloseButtonShown: true,
  title: null,
  canEscapeKeyClose: true,
  canOutsideClickClose: true,
  isFullscreenInMobile: false,
  hasStickyFooterInMobile: false,
  className: null,
  width: 460,
  height: 'auto',
  textAlign: 'center',
}

export default Dialog
