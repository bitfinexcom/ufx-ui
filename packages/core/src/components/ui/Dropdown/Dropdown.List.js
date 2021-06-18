import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import _includes from 'lodash/includes'
import _isEmpty from 'lodash/isEmpty'
import _join from 'lodash/join'
import _keys from 'lodash/keys'
import _pickBy from 'lodash/pickBy'
import _toLower from 'lodash/toLower'
import PropTypes from 'prop-types'
import React, { useState, useMemo } from 'react'

import * as utils from '../../../common/utils'

const searchModifier = (searchValue) => searchValue.replace(/[\s/]/g, '')

const DropdownList = (props) => {
  const {
    value,
    options,
    optionRenderer,
    searchable,
    onChange,
    searchValues,
  } = props
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = useMemo(() => {
    if (!searchable || _isEmpty(searchValues)) {
      return options
    }

    return _pickBy(options, (optionValue, optionKey) => {
      const values = searchValues[optionKey]
      const joinedCcy = searchModifier(optionValue)
      const matches = _toLower(_join([...values, optionValue, joinedCcy]))

      return _includes(matches, _toLower(searchTerm))
    })
  },
  [options, searchTerm, searchable, searchValues])
  const keys = _keys(filtered)

  const handleSearchTermClick = (e) => {
    e.stopPropagation()
    setSearchTerm(e.target.value)
  }

  const onCancelClick = () => setSearchTerm('')

  return (
    <div className='list-wrapper'>
      {searchable && (
        <div className='list-search-wrapper'>
          <div className='list-search'>
            <input
              type='text'
              autoComplete='off'
              value={searchTerm}
              onChange={handleSearchTermClick}
            />
            {searchTerm
              ? <FontAwesomeIcon icon={faTimes} className='search-icon' onClick={onCancelClick} />
              : <FontAwesomeIcon icon={faSearch} className='search-icon' />}
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
  searchValues: PropTypes.objectOf(PropTypes.array),
}

DropdownList.defaultProps = {
  value: null,
  optionRenderer: null,
  searchable: false,
  onChange: () => { },
  searchValues: null,
}

export default DropdownList
