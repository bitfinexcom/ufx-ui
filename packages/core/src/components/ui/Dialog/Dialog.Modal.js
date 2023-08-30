import cx from 'classnames'
import FocusTrap from 'focus-trap-react'
import PropTypes from 'prop-types'
import React, { forwardRef, useMemo, useRef } from 'react'

import { DIALOG_CONTAINER_ID } from './Dialog.constants'
import * as Classes from '../../../common/classes'

const Modal = forwardRef(({
  state,
  className,
  canOutsideClickClose,
  onClose,
  isCloseButtonShown,
  icon: Icon,
  title,
  isFullscreenInMobile,
  hasStickyFooterInMobile,
  isFocusTrapEnabled,
  children,
  width,
  height,
  textAlign,
  style,
}, ref) => {
  const titleRef = useRef()
  const modalStyle = useMemo(() => ({
    maxWidth: width,
    height,
    textAlign,
    ...style,
  }), [width, height, textAlign, style])

  return (
    /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
    <FocusTrap
      focusTrapOptions={{
        fallbackFocus: document.getElementById(DIALOG_CONTAINER_ID),
        initialFocus: titleRef.current,
        allowOutsideClick: true,
      }}
      active={isFocusTrapEnabled}
    >
      <div className={cx(Classes.DIALOG)}>
        <div
          className={cx('background', state, {
            'is-mobile-fullscreen': isFullscreenInMobile,
          })}
          onClick={canOutsideClickClose ? onClose : undefined}
        />
        <div
          role='dialog'
          aria-modal='true'
          className={cx('modal', className, state, {
            'is-mobile-fullscreen': isFullscreenInMobile,
          })}
          ref={ref}
          style={modalStyle}
        >
          {title && (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            <div className='modal__title' ref={titleRef.current} tabIndex='0'>
              {title}
            </div>
          )}
          {isCloseButtonShown && (
            <button type='button' className='modal__close-button' onClick={onClose}>
              &#10005;
            </button>
          )}
          {Icon && (
            <div className='modal__icon'>
              {typeof Icon === 'function' ? <Icon /> : Icon}
            </div>
          )}
          <div
            className={cx('modal__body', {
              'is-sticky-footer': hasStickyFooterInMobile,
            })}
          >
            {children}
          </div>
        </div>
      </div>
    </FocusTrap>
  )
})

Modal.propTypes = {
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
   * @default true
   */
  isCloseButtonShown: PropTypes.bool,
  /**
   * Whether clicking outside the overlay element (either on backdrop when present or on document)
   * should invoke `onClose`.
   * @default true
   */
  canOutsideClickClose: PropTypes.bool,
  /**
   * Whether to show the modal in fullscreen mode on mobile.
   * @default false
   */
  isFullscreenInMobile: PropTypes.bool,
  /**
   * Whether to show the footer in fullscreen mode on mobile fixed to the bottom.
   * @default false
   */
  hasStickyFooterInMobile: PropTypes.bool,

  /** A space-delimited list of class names to pass along to a child element. */
  className: PropTypes.string,

  /** Determines the max width of the dialog in desktop. */
  width: PropTypes.number,

  /** Determines the max height of the dialog in desktop. */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Determines the text alignment of the dialog */
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  /**
   * If true, modal is using focus-trap library for better UX.
   * Need to disable if modal contains iframe, to avoid conflicts
   */
  isFocusTrapEnabled: PropTypes.bool.isRequired,
  /**
   * Style object of the Modal
   */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
}

Modal.defaultProps = {
  icon: null,
  isCloseButtonShown: true,
  title: null,
  canOutsideClickClose: true,
  isFullscreenInMobile: false,
  hasStickyFooterInMobile: false,
  className: null,
  width: 460,
  height: 'auto',
  textAlign: 'center',
  style: {},
}

export default Modal
