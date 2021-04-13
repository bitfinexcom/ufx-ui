import {
  faSearchMinus, faSearchPlus, faMinus, faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import withI18nProvider from '../../hoc/withI18nProvider'
import { book } from '../../var/config'
import Button from '../ui/Button'
import CooldownButton from '../ui/CooldownButton'

const BookToolbar = (props) => {
  const {
    prec,
    updatePrec,
    zoom,
    updateZoom,
    config,
  } = props
  const classes = cx(`${Classes.BOOK}__toolbar`, Classes.RIGHT_TO_LEFT)
  const { t } = useTranslation('book')

  return (
    <div className={classes}>
      <Button
        title={t('decrease_zoom')}
        onClick={() => updateZoom(-20)}
        minimal
        icon='minus'
        disabled={zoom === config.MIN_ZOOM}
      >
        <FontAwesomeIcon icon={faSearchMinus} />
      </Button>
      <Button
        title={t('increase_zoom')}
        onClick={() => updateZoom(20)}
        minimal
        disabled={zoom === config.MAX_ZOOM}
      >
        <FontAwesomeIcon icon={faSearchPlus} />
      </Button>
      <CooldownButton
        title={t('decrease_precision')}
        onClick={() => updatePrec(prec + 1)}
        timeoutMs={config.UPDATE_COOLDOWN_MS}
        minimal
        icon='minus'
        disabled={prec === config.MAX_PRECISION}
      >
        <FontAwesomeIcon icon={faMinus} />
      </CooldownButton>
      <CooldownButton
        title={t('increase_precision')}
        onClick={() => updatePrec(prec - 1)}
        timeoutMs={config.UPDATE_COOLDOWN_MS}
        minimal
        disabled={prec === 0}
      >
        <FontAwesomeIcon icon={faPlus} />
      </CooldownButton>
    </div>
  )
}

BookToolbar.propTypes = {
  prec: PropTypes.number.isRequired,
  updatePrec: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequired,
  updateZoom: PropTypes.func.isRequired,
  config: PropTypes.shape({
    UPDATE_COOLDOWN_MS: PropTypes.number.isRequired,
    MAX_PRECISION: PropTypes.number.isRequired,
  }),
}

BookToolbar.defaultProps = {
  config: book,
}

export default withI18nProvider(memo(BookToolbar))
