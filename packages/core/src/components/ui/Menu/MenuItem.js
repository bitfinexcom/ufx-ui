/* eslint-disable react/jsx-props-no-spreading */
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import * as Classes from '../../../common/classes'

const propTypes = {
  /** Item text, required for usability. */
  text: PropTypes.node.isRequired,
  /**
   * Children of this component will be rendered in a __submenu__ that appears when hovering or
   * clicking on this menu item.
   *
   * Use `text` prop for the content of the menu item itself.
   */
  children: PropTypes.node,
  /**
   * Name of the HTML tag that wraps the MenuItem.
   * @default "a"
   */
  as: PropTypes.string,
  /**
   * A space-delimited list of class names to pass along to the text wrapper element.
   */
  className: PropTypes.string,
}

const defaultProps = {
  as: 'a',
  children: null,
  className: null,
}

export default function MenuItem(props) {
  const {
    text,
    className,
    as: Component,
    children,
    ...rest
  } = props

  return (
    <li>
      <Component className={cx(`${Classes.MENU}__item`, className)} {...rest}>
        {text || children}
      </Component>
    </li>
  )
}

MenuItem.propTypes = propTypes
MenuItem.defaultProps = defaultProps
