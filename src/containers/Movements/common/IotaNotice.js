import {
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ExternalLink, Notice, NOTICE_TYPES,
} from '../../../components/ui'

const IotaNotice = (props) => {
  const { showLast } = props
  const { t } = useTranslation('iota_notice')

  return (
    <div className='deposit-iota-warning'>
      <Notice type={NOTICE_TYPES.INFO}>
        <span className='deposit-iota-notice-header'>
          {t('part0')}
        </span>
        <br />
        <br />

        <span>
          {t('part1')}
        </span>
        {' '}

        {t('part2')}

        {showLast && (
        <span>
          {' '}
          {t('part3')}
        </span>
        )}
        <br />
        <br />

        {t('part4')}
        :
        <br />

        <FontAwesomeIcon icon={faCaretRight} />
        {' '}
        <ExternalLink link='http://iotasupport.com/whatisiota.shtml'>
          {t('link_intro')}
        </ExternalLink>
        <br />
        <FontAwesomeIcon icon={faCaretRight} />
        {' '}
        <ExternalLink link='http://iotasupport.com/walletknowledgebase.shtml'>
          {t('link_wallet')}
        </ExternalLink>
        <br />

        <FontAwesomeIcon icon={faCaretRight} />
        {' '}
        <ExternalLink link='http://iota.bitfinex.com:80'>
          {t('part5', { address: 'http://iota.bitfinex.com:80' })}
        </ExternalLink>
      </Notice>
    </div>
  )
}

IotaNotice.propTypes = {
  showLast: PropTypes.bool,
}

IotaNotice.defaultProps = {
  showLast: false,
}

export default memo(IotaNotice)
