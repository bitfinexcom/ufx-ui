import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { Input, Checkbox, Tooltip } from '../ui'

const BalancesToolbar = (props) => {
  const {
    searchTerm,
    setSearchTerm,
    hideSmallBalances,
    setHideSmallBalances,
    smallBalanceThreshold,
  } = props
  const { t } = useTranslation('balances')

  const handleClick = () => setHideSmallBalances(!hideSmallBalances)

  return (
    <div className='toolbar'>
      <Input
        placeholder={`${t('common:filter')}..`}
        small
        rightElement={<FontAwesomeIcon icon={faSearch} className='search-icon' />}
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <div className='hide-small-balance-wrapper'>
        <Checkbox
          small
          label={(
            <Tooltip
              content={t('hide_small_balance_tooltip', { threshold: smallBalanceThreshold })}
            >{t('hide_small_balance')}
            </Tooltip>
          )}
          className='hide-small-balance'
          checked={hideSmallBalances}
          onChange={handleClick}
        />
      </div>
    </div>
  )
}

BalancesToolbar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  hideSmallBalances: PropTypes.bool.isRequired,
  setHideSmallBalances: PropTypes.func.isRequired,
  smallBalanceThreshold: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

export default memo(BalancesToolbar)
