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
    onChange,
    ...rest
  } = props

  const tabClasses = cx('tab', className, {
    'tab--active': active === id,
  })

  const handleTabSelect = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onChange(id)
  }

  return (
    <div
      className={tabClasses}
      onClick={handleTabSelect}
      onKeyPress={utils.handleKeyboardEvent(['Enter', ' '], handleTabSelect)}
      role='tab'
      tabIndex='0'
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
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
  onChange: PropTypes.func.isRequired,
}

Tab.defaultProps = {
  active: '',
  className: null,
}

export default Tab
