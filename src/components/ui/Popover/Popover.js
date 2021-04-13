/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { usePopper } from 'react-popper'
import { Transition } from 'react-transition-group'

import * as Classes from '../../../common/classes'
import Portal from '../Portal'

export const PopoverPosition = {
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
}

export const PopoverInteractionKind = {
  HOVER: 'hover',
  CLICK: 'click',
}

const propTypes = {
  /**
   * Callback invoked in controlled mode when the popover open state *would*
   * change due to user interaction.
   */
  onInteraction: PropTypes.func,
  /**
   * Whether the popover is visible. Passing this prop puts the popover in
   * controlled mode, where the only way to change visibility is by updating
   * this property.
   */
  isOpen: PropTypes.bool,
  /**
   * The position (relative to the target) at which the popover should appear.
   */
  position: PropTypes.oneOf(Object.values(PopoverPosition)),
  /**
   * The kind of interaction that triggers the display of the popover.
   */
  interactionKind: PropTypes.oneOf(Object.values(PopoverInteractionKind)),
  /**
   * The content displayed inside the popover.
   */
  content: PropTypes.node.isRequired,
  /**
   * The classname of the popover wrapper.
   */
  className: PropTypes.string,
  /**
   * The z-index of the popover element.
   */
  zIndex: PropTypes.number,
}

const defaultProps = {
  isOpen: false,
  onInteraction: null,
  position: PopoverPosition.BOTTOM,
  interactionKind: PopoverInteractionKind.CLICK,
  className: undefined,
  zIndex: 99,
}

export default function Popover(props) {
  const {
    onInteraction: onInteractionProp,
    interactionKind,
    position,
    isOpen: isOpenProp,
    content,
    children,
    className,
    zIndex,
  } = props

  const [isOpen, setIsOpen] = useState(isOpenProp)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: position,
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
    ],
  })

  const hoverInteraction = interactionKind === PopoverInteractionKind.HOVER
  const clickInteraction = interactionKind === PopoverInteractionKind.CLICK
  const onInteraction = onInteractionProp || setIsOpen

  useEffect(() => {
    setIsOpen(isOpenProp)
  }, [isOpenProp])

  useEffect(() => {
    function onOutsideClick(event) {
      if (isOpen && [referenceElement, popperElement].every(el => el && event.target !== el && !el.contains(event.target))) {
        onInteraction(!isOpen)
      }
    }

    if (clickInteraction) {
      document.body.addEventListener('click', onOutsideClick)
    }

    return () => {
      if (clickInteraction) {
        document.body.removeEventListener('click', onOutsideClick)
      }
    }
  }, [isOpen, popperElement, referenceElement, onInteraction, clickInteraction])

  return (
    <span
      ref={setReferenceElement}
      className={cx(Classes.POPOVER, className)}
      onClick={clickInteraction ? () => onInteraction(!isOpen) : undefined}
      onMouseEnter={hoverInteraction ? () => onInteraction(true) : undefined}
      onMouseLeave={hoverInteraction ? () => onInteraction(false) : undefined}
    >
      {children}
      <Portal id='popover-container' target={document.body}>
        <div
          className={`${Classes.POPOVER}__popper`}
          ref={setPopperElement}
          style={{ ...styles.popper, zIndex }}
          onMouseEnter={hoverInteraction ? () => onInteraction(true) : undefined}
          onMouseLeave={hoverInteraction ? () => onInteraction(false) : undefined}
          {...attributes.popper}
        >
          <Transition
            in={isOpen}
            timeout={300}
            onEnter={node => node.offsetHeight}
            mountOnEnter
            unmountOnExit
          >
            {state => (
              <div className={cx(`${Classes.POPOVER}__content`, state, position)}>
                {content}
                <div
                  ref={setArrowElement}
                  className={`${Classes.POPOVER}__arrow`}
                  style={styles.arrow}
                />
              </div>
            )}
          </Transition>
        </div>
      </Portal>
    </span>
  )
}

Popover.propTypes = propTypes
Popover.defaultProps = defaultProps
