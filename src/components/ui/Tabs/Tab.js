import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import * as utils from '../../../common/utils'

const Tab = (props) => {
  const {
    id,
    title,
    active,
    className,
    style,
    onChange,
  } = props

  const tabClasses = cx('tab', className, {
    'tab--active': active === id,
  })

  const handleTabSelect = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onChange(id)
  }

  const tabProps = {
    className: tabClasses,
    style,
    onClick: handleTabSelect,
    onKeyPress: utils.handleKeyboardEvent(['Enter', ' '], handleTabSelect),
    role: 'tab',
    tabIndex: '0',
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...tabProps}>
      <span>{title}</span>
    </div>
  )
}

export const TAB_PROP_TYPE = {
  id: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string,
  ]).isRequired,
  title: PropTypes.elementType.isRequired,
}

Tab.propTypes = {
  ...TAB_PROP_TYPE,
  active: PropTypes.string,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

Tab.defaultProps = {
  active: '',
  className: null,
  style: null,
}

export default Tab
