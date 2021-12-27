import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import _get from 'lodash/get'
import _isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import {
  Tabs, Input, Button, Dropdown,
} from '../ui'
import { TAB_PROP_TYPE } from '../ui/Tabs/Tab'
import { FAV_TAB, ACTION_TYPES, KEYS } from './MarketList.constants'
import { getDefaultTab } from './MarketList.helpers'

const MarketListToolbar = (props) => {
  const {
    tabs,
    activeTab,
    searchTerm,
    dispatch,
  } = props
  const { t } = useTranslation()
  const options = {}
  tabs.forEach(tab => {
    const id = _get(tab, 'id')
    const title = _get(tab, 'title')
    options[id] = title
  })

  const applyFilter = (filterKey, filterValue) => dispatch({
    type: ACTION_TYPES.SET_FILTER,
    payload: {
      filterKey,
      filterValue,
    },
  })

  const toggleFavButton = () => {
    const selectedTab = activeTab !== FAV_TAB ? FAV_TAB : getDefaultTab(tabs)
    applyFilter(KEYS.QUOTE_CCY, selectedTab)
  }

  return (
    <div className={`${Classes.MARKET_LIST}__toolbar`}>
      <Button
        className={cx('fav-button', {
          'fav-button--active': activeTab === FAV_TAB,
        })}
        onClick={toggleFavButton}
      >
        {activeTab === FAV_TAB
          ? <FontAwesomeIcon icon={faStar} />
          : <FontAwesomeIcon icon={faStarEmpty} />}
        {' '}
        <span className='hidden-xs hidden-xxs'>{t('marketlist:favorites')}</span>
      </Button>

      <Tabs
        tabs={tabs}
        active={activeTab}
        containerClassName='hidden-md hidden-sm hidden-s hidden-xs hidden-xxs'
        onChange={(value) => applyFilter(KEYS.QUOTE_CCY, value)}
      />
      <Dropdown
        value={activeTab}
        options={options}
        onChange={(value) => applyFilter(KEYS.QUOTE_CCY, value)}
        searchable
        className='quoteccy-dropdown hidden-hg hidden-xl hidden-lg'
      />
      <Input
        className='search-input'
        rightElement={<FontAwesomeIcon icon={faSearch} />}
        value={searchTerm}
        onChange={(value) => applyFilter(KEYS.BASE_CCY, value)}
      />
    </div>
  )
}

MarketListToolbar.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape(TAB_PROP_TYPE)).isRequired,
  activeTab: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default memo(MarketListToolbar, _isEqual)
