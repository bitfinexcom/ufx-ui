import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'

import * as Classes from '../../../common/classes'
import Button from '../Button'

// eslint-disable-next-line prefer-arrow-callback
const SortableButton = forwardRef(function SortableButton(props, ref) {
  const {
    content,
    onSortClick,
    field,
    sortBy,
    sortAscending,
    defaultSortAscending,
  } = props

  return (
    <Button
      minimal
      onClick={() => onSortClick(field, defaultSortAscending)}
      className={Classes.SORT_BUTTON}
      ref={ref}
    >
      <span>
        {content}
        <FontAwesomeIcon
          size='xs'
          icon={sortBy === field
            ? (sortAscending ? faAngleUp : faAngleDown)
            : (defaultSortAscending ? faAngleUp : faAngleDown)}
          className={cx('arrow-icon', {
            active: sortBy === field,
          })}
        />
      </span>
    </Button>
  )
})

SortableButton.propTypes = {
  /**
   * The content of the SortButton.
   */
  content: PropTypes.node.isRequired,
  /**
   * The function called when clicked on the SortButton.
   */
  onSortClick: PropTypes.func,
  /**
   * The field of the SortButton.
   */
  field: PropTypes.string,
  /**
   * The sortBy of the SortButton.
   */
  sortBy: PropTypes.string,
  /**
   * If true, sorts the SortButton in an ascending manner.
   */
  sortAscending: PropTypes.bool,
  /**
   * If true, sets the sorting of the SortButton in an ascending manner by default.
   */
  defaultSortAscending: PropTypes.bool,
}

SortableButton.defaultProps = {
  onSortClick: () => {},
  field: null,
  sortBy: null,
  sortAscending: false,
  defaultSortAscending: false,
}

export default SortableButton
