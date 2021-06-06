import { faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import withI18nProvider from '../../hoc/withI18nProvider'
import Button from '../ui/Button'

const DepthChartToolbar = ({
  zoom,
  updateZoom,
  config,
}) => {
  const classes = cx(`${Classes.DEPTH_CHART}__toolbar`, Classes.RIGHT_TO_LEFT)
  const { t } = useTranslation('depthchart')

  return (
    <div className={classes}>
      <Button
        title={t('decrease_zoom')}
        onClick={() => updateZoom(10)}
        minimal
        disabled={zoom === config.MAX_ZOOM}
      >
        <FontAwesomeIcon icon={faSearchMinus} />
      </Button>
      <Button
        title={t('increase_zoom')}
        onClick={() => updateZoom(-10)}
        minimal
        disabled={zoom === config.MIN_ZOOM}
      >
        <FontAwesomeIcon icon={faSearchPlus} />
      </Button>
    </div>
  )
}

export default withI18nProvider(memo(DepthChartToolbar))
