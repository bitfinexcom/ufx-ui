import { Notice, NOTICE_TYPES } from '@ufx-ui/core'
import React, { memo } from 'react'
import { Trans } from 'react-i18next'

const AMP_LINK = 'https://support.bitfinex.com/hc/en-us/articles/360025320913-Ampleforth'

const AMP = () => (
  <Notice type={NOTICE_TYPES.WARNING}>
    <Trans i18nKey='deposits:ampl_deposit_warning'>
      <a
        href={AMP_LINK}
        target='_blank'
        rel='noopener noreferrer'
      >
        the Ampleforth Support Article
      </a>
    </Trans>
  </Notice>
)

export default memo(AMP)
