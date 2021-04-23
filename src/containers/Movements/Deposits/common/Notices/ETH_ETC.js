import React, { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Notice, Button, Dialog } from '../../../../../components/ui'
import EthereumNotice from './Ethereum'

const ETH_ETC = () => {
  const { t } = useTranslation('deposits')
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Notice>
      {t('warnings.send_to_eth_1')}
      {' '}
      <strong>{t('warnings.send_to_eth_2')}</strong>
      {t('warnings.send_to_eth_3')}
      {' '}
      <Button
        minimal
        small
        onClick={() => setIsModalOpen(true)}
        className='info-button'
      >
        {t('more_info')}
      </Button>

      <Dialog
        title={`Ethereum ${t('deposits')}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        canOutsideClickClose
        canEscapeKeyClose
      >
        <EthereumNotice />
      </Dialog>
    </Notice>
  )
}

export default memo(ETH_ETC)
