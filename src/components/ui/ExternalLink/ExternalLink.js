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
  link: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  target: PropTypes.string,
}

ExternalLink.defaultProps = {
  className: null,
  target: '_blank',
}

export default memo(ExternalLink)
