import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import _includes from 'lodash/includes'
import _keys from 'lodash/keys'
import _pickBy from 'lodash/pickBy'
import _toLower from 'lodash/toLower'
import _isFunction from 'lodash/isFunction'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import * as utils from '../../../common/utils'

const DropdownList = (props) => {
  const {
    value,
    options,
    optionRenderer,
    searchable,
    searchModifier,
    onChange,
  } = props
  const [searchTerm, setSearchTerm] = useState('')
  const filtered = _pickBy(options, (optionValue, optionKey) => {
    const val = _isFunction(searchModifier) ? searchModifier(optionValue) : optionValue
    const key = _isFunction(searchModifier) ? searchModifier(optionKey) : optionKey
    const search = _isFunction(searchModifier) ? searchModifier(searchTerm) : searchTerm

    return (
      !searchTerm
        || _includes(_toLower(key), _toLower(search))
        || _includes(_toLower(val), _toLower(search))
    )
  })
  const keys = _keys(filtered)

  const handleSearchTermClick = (e) => {
    e.stopPropagation()
    setSearchTerm(e.target.value)
  }

  return (
    <ul className='list'>
      {searchable && (
        <li>
          <div className='list-search'>
            <input
              type='text'
              autoComplete='off'
              value={searchTerm}
              onChange={handleSearchTermClick}
            />
            <FontAwesomeIcon className='search-icon' icon={faSearch} />
          </div>
        </li>
      )}
      {keys.map((key) => (
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
  )
}

DropdownList.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.object.isRequired,
  optionRenderer: PropTypes.func,
  searchable: PropTypes.bool,
  onChange: PropTypes.func,
}

DropdownList.defaultProps = {
  value: null,
  optionRenderer: null,
  searchable: false,
  onChange: () => { },
}

export default DropdownList
