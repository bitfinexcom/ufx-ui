import cx from 'classnames'
import _includes from 'lodash/includes'
import _isEmpty from 'lodash/isEmpty'
import _isFunction from 'lodash/isFunction'
import _keys from 'lodash/keys'
import _pickBy from 'lodash/pickBy'
import _toLower from 'lodash/toLower'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'

import * as utils from '../../../common/utils'

const DropdownList = (props) => {
  const {
    value,
    options,
    optionRenderer,
    searchable,
    onChange,
    onSearchTermChange,
    searchTerm,
  } = props

  const filtered = useMemo(() => {
    if (!searchable || _isEmpty(searchTerm) || _isFunction(onSearchTermChange)) {
      return options
    }

    return _pickBy(options, (optionValue, optionKey) => !searchTerm
    || _includes(_toLower(optionKey), _toLower(searchTerm))
    || _includes(_toLower(optionValue), _toLower(searchTerm)))
  },
  [options, searchTerm, searchable, onSearchTermChange])

  return (
    <div className='list-wrapper'>
      <div className='list-scroller'>
        <ul className='list'>
          {_keys(filtered).map((key) => (
            <li key={key}>
              <div
                className={cx('list-item', {
                  'list-item--active': value === key,
                })}
                onClick={() => onChange(key)}
                onKeyPress={utils.handleKeyboardEvent('Enter', () => onChange(key))}
                tabIndex={0}
                role='button'
                value={key}
              >
                {!optionRenderer
                  ? options[key]
                  : optionRenderer(key, options[key])}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

DropdownList.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.objectOf(PropTypes.string).isRequired,
  optionRenderer: PropTypes.func,
  searchable: PropTypes.bool,
  onChange: PropTypes.func,
  onSearchTermChange: PropTypes.func,
}

DropdownList.defaultProps = {
  value: null,
  optionRenderer: null,
  searchable: false,
  onChange: () => { },
  onSearchTermChange: null,
}

export default DropdownList
