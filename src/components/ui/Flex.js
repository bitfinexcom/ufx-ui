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
  children: PropTypes.node.isRequired,
  style: PropTypes.shape(),
  className: PropTypes.string,
  id: PropTypes.string,
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
