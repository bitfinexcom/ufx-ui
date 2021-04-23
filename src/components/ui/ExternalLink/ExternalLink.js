import PropTypes from 'prop-types'
import React, { memo, forwardRef } from 'react'

// eslint-disable-next-line prefer-arrow-callback
const ExternalLink = forwardRef(function ExternalLink(props, ref) {
  const {
    link,
    children,
    className,
    target,
  } = props
  return (
    <a
      href={link}
      ref={ref}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : ''}
      className={className}
    >
      {children}
    </a>
  )
})

ExternalLink.propTypes = {
  /**
   * The link/href of the ExternalLink.
   */
  link: PropTypes.string.isRequired,
  /**
   * The children of the ExternalLink.
   */
  children: PropTypes.node.isRequired,
  /**
   * The className of the ExternalLink.
   */
  className: PropTypes.string,
  /**
   * The target of the ExternalLink.
   */
  target: PropTypes.string,
}

ExternalLink.defaultProps = {
  className: null,
  target: '_blank',
}

export default memo(ExternalLink)
