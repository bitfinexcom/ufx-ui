import { faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Notice, NOTICE_TYPES } from '@ufx-ui/core'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { IotaNotice } from '../../../common'

const IOTA = () => {
  const { t } = useTranslation('deposits')

  return (
    <>
      <Notice type={NOTICE_TYPES.WARNING}>
        <span>
          {t('warnings.iota_deposit_once_1')}
          <span className='underline'>

            {t('warnings.iota_deposit_once_2')}
          </span>
          {t('warnings.iota_deposit_once_3')}
        </span>
        {' '}
        <span>
          {t('warnings.deposit_add_change_1')}
          <FontAwesomeIcon icon={faSync} />
          {t('warnings.deposit_add_change_2')}
        </span>
      </Notice>
      <IotaNotice />
    </>
  )
}

export default memo(IOTA)
