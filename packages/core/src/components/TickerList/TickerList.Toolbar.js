import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { Input } from '../ui'

const TickerListToolbar = (props) => {
  const {
    searchTerm,
    setSearchTerm,
  } = props
  const { t } = useTranslation()

  return (
    <Input
      placeholder={`${t('common:search')}..`}
      small
      rightElement={<FontAwesomeIcon icon={faSearch} className='search-icon' />}
      value={searchTerm}
      className='search-ccy'
      onChange={setSearchTerm}
      type='search'
    />
  )
}

TickerListToolbar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
}

export default memo(TickerListToolbar)
