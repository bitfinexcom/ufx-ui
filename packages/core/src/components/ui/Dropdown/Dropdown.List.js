import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import _includes from 'lodash/includes'
import _isEmpty from 'lodash/isEmpty'
import _isFunction from 'lodash/isFunction'
import _keys from 'lodash/keys'
import _pickBy from 'lodash/pickBy'
import _toLower from 'lodash/toLower'
import PropTypes from 'prop-types'
import React, { useState, useMemo } from 'react'

import * as utils from '../../../common/utils'
import Button from '../Button'
import Input from '../Input'

const DropdownList = (props) => {
  const {
    value,
    options,
    optionRenderer,
    searchable,
    onChange,
    onSearchTermChange,
  } = props
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = useMemo(() => {
    if (!searchable || _isEmpty(searchTerm) || _isFunction(onSearchTermChange)) {
      return options
    }

    return _pickBy(options, (optionValue, optionKey) => !searchTerm
          || _includes(_toLower(optionKey), _toLower(searchTerm))
          || _includes(_toLower(optionValue), _toLower(searchTerm)))
  },
  [options, searchTerm, searchable, onSearchTermChange])

  const keys = useMemo(() => _keys(filtered), [filtered])

  const updateSearchTerm = (_value) => {
    if (_isFunction(onSearchTermChange)) {
      onSearchTermChange(_value)
    }
    setSearchTerm(_value)
  }

  const handleSearchTermChange = (_value, event) => {
    event.stopPropagation()
    updateSearchTerm(_value)
  }

  const onCancelClick = () => {
    updateSearchTerm('')
  }

  return (
    <div className='list-wrapper'>
      {searchable && (
        <div className='list-search-wrapper'>
          <div className='list-search'>
            <Input
              small
              rightElement={searchTerm
                ? (
                  <Button onClick={onCancelClick} minimal>
                    <FontAwesomeIcon icon={faTimes} className='search-icon' />
                  </Button>
                )
                : <FontAwesomeIcon icon={faSearch} className='search-icon' />}
              value={searchTerm}
              className='search-ccy'
              onChange={handleSearchTermChange}
              type='text'
              autoComplete='off'
            />
          </div>
        </div>
      )}
      <div className='list-scroller'>
        <ul className='list'>
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
