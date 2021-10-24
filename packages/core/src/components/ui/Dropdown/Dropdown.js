import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import _isFunction from 'lodash/isFunction'
import PropTypes from 'prop-types'
import React, { useState, forwardRef, useEffect } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { useTranslation } from 'react-i18next'

import withI18nProvider from '../../../hoc/withI18nProvider'
import * as Classes from '../../../common/classes'
import * as utils from '../../../common/utils'
import Input from '../Input'
import DropdownList from './Dropdown.List'

// eslint-disable-next-line prefer-arrow-callback
const Dropdown = forwardRef(function Dropdown(props, ref) {
  const {
    value,
    valueRenderer,
    options,
    optionRenderer,
    id,
    name,
    searchable,
    className,
    onChange,
    small,
    placeholder,
    closeOnMouseLeave,
    isOpen: isOpenProp,
    onSearchTermChange,
    ...rest
  } = props
  const { t } = useTranslation('ui')
  const [isOpen, setIsOpen] = useState(isOpenProp)
  const content = valueRenderer && valueRenderer(value, options[value])
  const classes = cx(Classes.DROPDOWN, className, {
    [Classes.DROPDOWN + Classes.SIZE_SMALL]: small,
    'is-open': isOpen,
  })

  useEffect(() => {
    setIsOpen(isOpenProp)
  }, [isOpenProp])

  const val = content || options[value]
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!_isFunction(onSearchTermChange)) {
      setSearchTerm(val)
    }
  }, [onSearchTermChange, val])

  const updateSearchTerm = (_value) => {
    if (_isFunction(onSearchTermChange)) {
      onSearchTermChange(_value)
    }
    setSearchTerm(_value)
  }

  const handleSearchTermChange = (_value, e) => {
    e.stopPropagation()
    setIsOpen(true)
    updateSearchTerm(_value)
  }

  const handleDropDownToggle = (_isOpen) => {
    setIsOpen(_isOpen)
    if (!searchable) {
      return
    }

    updateSearchTerm('')
  }

  // close dropdown-menu, reset searchterm
  const onOutsideClick = (e) => {
    e.stopPropagation()
    handleDropDownToggle(false)
  }

  // open dropdown-menu, reset searchterm
  const onDropdownClick = (e) => {
    e.stopPropagation()
    const flag = searchable ? true : !isOpen
    handleDropDownToggle(flag)
  }

  // toggle dropdown-menu, reset searchterm
  const onDropdownArrowClick = (e) => {
    e.stopPropagation()
    handleDropDownToggle(!isOpen)
  }

  const dropdownValue = searchable && isOpen ? searchTerm : val

  const defPlaceholder = searchable ? t('typeToSearch') : t('selectOption')

  const element = (
    <Input
      ref={ref}
      className='dropdown-field'
      disabled={!searchable}
      onClick={onDropdownClick}
      id={id}
      name={name}
      onChange={handleSearchTermChange}
      data-qa={dropdownValue}
      value={dropdownValue}
      placeholder={placeholder || defPlaceholder}
      rightElement={(
        <div
          className='arrow-icon'
          role='button'
          tabIndex={0}
          onClick={onDropdownArrowClick}
          onKeyPress={utils.handleKeyboardEvent('Enter', onDropdownArrowClick)}
        >
          <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} size={small ? 'sm' : 'lg'} />
        </div>
      )}
      small={small}
    />
  )

  const handleDropdownItemChange = (key) => {
    setIsOpen(false)
    onChange(key)
  }

  return (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>
      <div
        className={classes}
        onMouseLeave={closeOnMouseLeave ? () => setIsOpen(false) : undefined}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {element}

        {isOpen && (
          <DropdownList
            options={options}
            value={value}
            searchable={searchable}
            optionRenderer={optionRenderer}
            onChange={handleDropdownItemChange}
            onSearchTermChange={onSearchTermChange}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </OutsideClickHandler>
  )
})

Dropdown.propTypes = {
  /**
   * The value renderer function of the Dropdown.
   */
  valueRenderer: PropTypes.func,
  /**
   * The ID of the Dropdown.
   */
  id: PropTypes.string,
  /**
   * The name of the Dropdown.
   */
  name: PropTypes.string,
  /**
   * The className of the Dropdown.
   */
  className: PropTypes.string,
  /**
   * If true, shows the Button in a small style.
   */
  small: PropTypes.bool,
  /**
   * The placeholder of the Dropdown.
   */
  placeholder: PropTypes.string,
  /**
   * If true, closes the dropdown on mouse leave.
   */
  closeOnMouseLeave: PropTypes.bool,
  /**
   * If true, renders the dropdown in an open initial state.
   */
  isOpen: PropTypes.bool,
  /**
   * If true, renders the dropdown with a search input.
   */
  searchable: PropTypes.bool,
  onSearchTermChange: PropTypes.func,
  ...DropdownList.propTypes,
}

Dropdown.defaultProps = {
  valueRenderer: null,
  id: null,
  name: null,
  className: null,
  small: false,
  placeholder: null,
  closeOnMouseLeave: false,
  isOpen: false,
  searchable: false,
  onSearchTermChange: null,
  ...DropdownList.defaultProps,
}

export default withI18nProvider(Dropdown)
