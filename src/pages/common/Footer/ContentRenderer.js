import cx from 'classnames'
import React from 'react'

import Dropdown from '../../../components/ui/Dropdown'
import ExternalLink from '../../../components/ui/ExternalLink'
import { PROP_ROW, TYPES } from './Footer.constants'

const Renderer = ({ content = {} }) => {
  const { type } = content
  switch (type) {
    case TYPES.IMAGE: {
      const { src, alt } = content
      return <img src={src} alt={alt} className={cx(type)} />
    }
    case TYPES.IMAGE_LINK: {
      const { src, alt, href } = content
      return <ExternalLink link={href}><img src={src} alt={alt} className={cx(type)} /></ExternalLink>
    }
    case TYPES.TITLE: {
      const { label, className } = content
      return <span className={`title ${cx(className)}`}>{label}</span>
    }
    case TYPES.TEXT_LINK: {
      const { label, href, target } = content
      return <ExternalLink link={href} target={target}>{label}</ExternalLink>
    }
    case TYPES.DROPDOWN: {
      const { options, value, onChange } = content
      return <Dropdown options={options} value={value} onChange={onChange} />
    }
    case TYPES.TEXT: {
      const { label, className } = content
      return <span className={cx(className)}>{label}</span>
    }
    case TYPES.JSX: {
      const { Component } = content
      return <Component />
    }
    default: return (
      <p>
        invalid content type `{content.type}` of
        <pre>{JSON.stringify(content)}</pre>
      </p>
    )
  }
}

Renderer.propTypes = {
  content: PROP_ROW.isRequired,
}

export default Renderer
