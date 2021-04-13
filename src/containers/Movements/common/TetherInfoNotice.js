import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { ExternalLink } from '../../../components/ui'
import { XAUT } from '../constants'

const TETHER_GOLD_URL = 'https://gold.tether.to'
const TETHER_URL = 'https://tether.to'

const TetherInfoNotice = ({ currency }) => {
  const { t } = useTranslation('movements')

  return (
    currency === XAUT ? (
      <div>
        {t('tether_info_xaut_new')}
        <ExternalLink link={TETHER_GOLD_URL}>
          {t('tether_info_xaut_link')}
        </ExternalLink>
      </div>
    ) : (
      <div>
        {t('tether_info_new')}
        <ExternalLink link={TETHER_URL}>
          {t('tether_info_link')}
        </ExternalLink>
      </div>
    )
  )
}

TetherInfoNotice.propTypes = {
  currency: PropTypes.string.isRequired,
}

export default memo(TetherInfoNotice)
