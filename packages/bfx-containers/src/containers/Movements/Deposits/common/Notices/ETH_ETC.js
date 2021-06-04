import { Notice, Button, Dialog } from '@ufx-ui/core'
import React, { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import EthereumNotice from './Ethereum'

const ETH_ETC = () => {
  const { t } = useTranslation('deposits')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
        onClick={() => setIsDialogOpen(true)}
        className='info-button'
      >
        {t('more_info')}
      </Button>

      <Dialog
        title={`Ethereum ${t('deposits')}`}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <EthereumNotice />
      </Dialog>
    </Notice>
  )
}

export default memo(ETH_ETC)
