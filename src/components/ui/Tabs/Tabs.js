import cx from 'classnames'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'

import * as Classes from '../../../common/classes'
import Tab, { TAB_PROP_TYPE } from './Tab'

// eslint-disable-next-line prefer-arrow-callback
const Tabs = forwardRef(function Tabs(props, ref) {
  const {
    tabs,
    active,
    onChange,
    containerClassName,
    containerStyle,
    tabClassName,
    tabStyle,
  } = props

  const containerClasses = cx(Classes.TABS, containerClassName)

  return (
    <div
      className={containerClasses}
      style={containerStyle}
      ref={ref}
    >
      {tabs.map((data) => {
        const id = _get(data, 'id')
        const title = _get(data, 'title')

        return (
          <Tab
            key={id}
            id={id}
            title={title}
            active={active}
            className={tabClassName}
            style={tabStyle}
            onChange={onChange}
          />
        )
      })}
    </div>
  )
})

Tabs.propTypes = {
  /**
   * The tabs of the Tabs.
   */
  // tabs: { type: { name: 'object', required: false } },
  tabs: PropTypes.arrayOf(PropTypes.shape(TAB_PROP_TYPE)),
  /**
   * The active tab id of the Tabs.
   */
  active: PropTypes.string,
  /**
   * The function called when the Tabs state changes.
   */
  onChange: PropTypes.func,
  /**
   * The className of the container of the Tabs.
   */
  containerClassName: PropTypes.string,
  /**
   * The style of the container of the Tabs.
   */
  // eslint-disable-next-line react/forbid-prop-types
  containerStyle: PropTypes.object,
  /**
   * The className of the tab of the Tabs.
   */
  tabClassName: PropTypes.string,
  /**
   * The style of the tab of the Tabs.
   */
  // eslint-disable-next-line react/forbid-prop-types
  tabStyle: PropTypes.object,
}

Tabs.defaultProps = {
  tabs: [],
  active: '',
  onChange: () => { },
  containerClassName: null,
  containerStyle: null,
  tabClassName: null,
  tabStyle: null,
}

export default Tabs
