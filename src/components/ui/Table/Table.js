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
  /**
   * The content of the Table.
   */
  children: PropTypes.node.isRequired,
  /**
   * The className of the Table.
   */
  className: PropTypes.string,
  /**
   * The style of the Table.
   */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  /**
   * If true, the rows of the Table will have hover/focus and active interactions.
   */
  interactive: PropTypes.bool,
  /**
   * If true, the rows of the Table will display in a striped style.
   */
  striped: PropTypes.bool,
  /**
   * If true, the rows of the Table will display in a condensed style.
   */
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
