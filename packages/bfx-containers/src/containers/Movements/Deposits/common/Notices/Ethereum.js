import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

const Ethereum = () => {
  const { t } = useTranslation('deposits')

  return (
    <>
      <p>
        {t('send_to_eth_warning_1')}
        <strong>{t('send_to_eth_warning_2')}</strong>
        {t('send_to_eth_warning_3')}
      </p>
      <p>{t('send_to_eth_more')}</p>
    </>
  )
}

export default memo(Ethereum)
