/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types'
import React from 'react'

const Flex = (props = {}) => {
  const {
    children, style, className, id, horizontal,
  } = props
  const s = {
    display: 'flex',
    flexDirection: horizontal ? 'row' : 'column',
    ...style,
  }

  return (
    <div id={id} style={s} className={className}>
      {children}
    </div>
  )
}

Flex.propTypes = {
  /**
   * The children of the Flex.
   */
  children: PropTypes.node.isRequired,
  /**
   * The style of the Flex.
   */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  /**
   * The className of the Flex.
   */
  className: PropTypes.string,
  /**
   * The ID of the Flex.
   */
  id: PropTypes.string,
  /**
   * If true, renders the Flex in a row direction.
   */
  horizontal: PropTypes.bool,
}

Flex.defaultProps = {
  style: null,
  className: null,
  id: '',
  horizontal: false,
}

export const Row = props => <Flex horizontal {...props} />

export const Column = props => <Flex horizontal={false} {...props} />

export default Flex
