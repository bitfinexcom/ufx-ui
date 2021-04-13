import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'

import * as Classes from '../../../common/classes'

// TODO: small, bordered table props
// eslint-disable-next-line prefer-arrow-callback
const Table = forwardRef(function Table(props, ref) {
  const {
    children,
    className,
    style,
    interactive,
    striped,
    condensed,
  } = props

  const classes = cx(Classes.TABLE, className, {
    [Classes.TABLE_INTERACTIVE]: interactive,
    [Classes.TABLE_STRIPED]: striped,
    [Classes.TABLE_CONDENSED]: condensed,
  })

  return (
    <table ref={ref} className={classes} style={style}>
      {children}
    </table>
  )
})

Table.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  interactive: PropTypes.bool,
  striped: PropTypes.bool,
  condensed: PropTypes.bool,
}

Table.defaultProps = {
  className: null,
  style: null,
  interactive: false,
  striped: false,
  condensed: false,
}

export default Table
