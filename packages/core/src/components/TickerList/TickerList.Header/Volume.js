import _indexOf from 'lodash/indexOf'
import _keys from 'lodash/keys'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../../common/classes'
import * as utils from '../../../common/utils'
import { Tooltip } from '../../ui'

const Volume = (props) => {
  const {
    showVolumeUnit,
    volumeUnit,
    setVolumeUnit,
    volumeUnitList,
  } = props
  const { t } = useTranslation('tickerlist')

  const toggleVolumeUnit = (e) => {
    e.stopPropagation() // Do not propagate to avoid sorting when clicking volumeUnit buttons
    const units = _keys(volumeUnitList)
    const nextUnitIndex = (_indexOf(units, volumeUnit) + 1) % units.length
    setVolumeUnit(units[nextUnitIndex])
  }

  if (!showVolumeUnit) {
    return t('tickerlist:volume')
  }

  return (
    <span className='volume-header'>
      <span>{t('volume')}</span>
      <Tooltip
        className={`${Classes.TICKER_LIST}__volume-tooltip`}
        content={volumeUnit === volumeUnitList.SELF
          ? t('volume_tooltip_self')
          : t('volume_tooltip', { volumeUnit })}
        placement='top'
      >
        <span
          onClick={toggleVolumeUnit}
          onKeyPress={utils.handleKeyboardEvent('Enter', toggleVolumeUnit)}
          className='unit'
          role='button'
          tabIndex='0'
        >{volumeUnitList[volumeUnit]}
        </span>
      </Tooltip>
    </span>
  )
}

Volume.propTypes = {
  volumeUnit: PropTypes.string,
  setVolumeUnit: PropTypes.func.isRequired,
  volumeUnitList: PropTypes.objectOf(PropTypes.string).isRequired,
}

Volume.defaultProps = {
  volumeUnit: null,
}

export default memo(Volume)
