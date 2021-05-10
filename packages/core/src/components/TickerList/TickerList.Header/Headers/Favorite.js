import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Tooltip } from '../../../ui'

const Favorite = (props) => {
  const {
    showOnlyFavs,
    setShowOnlyFavs,
  } = props
  const { t } = useTranslation('tickerlist')

  return (
    <th className='fav-col'>
      <Button
        minimal
        className='fav-button'
        onClick={() => setShowOnlyFavs(!showOnlyFavs)}
      >
        <Tooltip content={t('fav_tooltip')}>
          <FontAwesomeIcon
            icon={showOnlyFavs ? faStar : faStarEmpty}
            className='fav-icon'
          />
        </Tooltip>
      </Button>
    </th>
  )
}

Favorite.propTypes = {
  showOnlyFavs: PropTypes.bool.isRequired,
  setShowOnlyFavs: PropTypes.func.isRequired,
}

export default memo(Favorite)
