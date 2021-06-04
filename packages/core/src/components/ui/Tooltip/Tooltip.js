/* eslint-disable react/jsx-indent */
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import TooltipTrigger from 'react-popper-tooltip'

import * as Classes from '../../../common/classes'

const PERSISTENT_HIDE_DELAY = 500

const TooltipComp = (children, className) => ({
  arrowRef,
  tooltipRef,
  getArrowProps,
  getTooltipProps,
  placement,
}) => (
  <div
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...getTooltipProps({
      ref: tooltipRef,
      className: cx('tooltip-container', Classes.TOOLTIP, className),
    })}
  >
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...getArrowProps({
        ref: arrowRef,
        className: 'tooltip-arrow',
        'data-placement': placement,
      })}
    />
    {children}
  </div>
)

const TriggerComp = ({ children }) => ({ getTriggerProps, triggerRef }) => (
  <span
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...getTriggerProps({
      ref: triggerRef,
      className: 'trigger',
    })}
  >
    {children}
  </span>
)

// eslint-disable-next-line prefer-arrow-callback
const Tooltip = forwardRef(function Tooltip(props, ref) {
  const {
    placement,
    trigger,
    usePortal,
    children,
    content,
    className,
    persistent,
  } = props

  const tooltipClasses = cx(className, {
    [`${Classes.TOOLTIP}--persistent`]: persistent,
  })

  return (
    <TooltipTrigger
      ref={ref}
      placement={placement}
      usePortal={usePortal}
      trigger={trigger}
      tooltip={TooltipComp(content, tooltipClasses)}
      delayHide={persistent ? PERSISTENT_HIDE_DELAY : undefined}
    >
      {TriggerComp({ children })}
    </TooltipTrigger>
  )
})

export const TOOLTIP_PLACEMENT_TYPES = {
  AUTO: 'auto',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
}
// do not use lodash methods/_values to show correct prop-types in storybook props table
export const TOOLTIP_PLACEMENT_TYPES_ARR = Object.values(TOOLTIP_PLACEMENT_TYPES)

export const TOOLTIP_TRIGGER_TYPES = {
  HOVER: 'hover',
  CLICK: 'click',
}
// do not use lodash methods/_values to show correct prop-types in storybook props table
export const TOOLTIP_TRIGGER_TYPES_ARR = Object.values(TOOLTIP_TRIGGER_TYPES)

Tooltip.propTypes = {
  /**
   * The placement of the Tooltip.
   */
  placement: PropTypes.oneOf(TOOLTIP_PLACEMENT_TYPES_ARR),
  /**
   * The trigger type of the Tooltip.
   */
  trigger: PropTypes.oneOf(TOOLTIP_TRIGGER_TYPES_ARR),
  /**
   * If true, use a portal to render the tooltip.
   */
  usePortal: PropTypes.bool,
  /**
   * The children of the Tooltip.
   */
  children: PropTypes.node.isRequired,
  /**
   * The content of the Tooltip.
   */
  content: PropTypes.node.isRequired,
  /**
   * The className of the Tooltip.
   */
  className: PropTypes.string,
  /**
   * If true, shows the Tooltip in a persistent manner where it delays the hiding event.
   */
  persistent: PropTypes.bool,
}

Tooltip.defaultProps = {
  placement: TOOLTIP_PLACEMENT_TYPES.AUTO,
  trigger: TOOLTIP_TRIGGER_TYPES.HOVER,
  usePortal: true,
  className: null,
  persistent: false,
}

export default Tooltip
