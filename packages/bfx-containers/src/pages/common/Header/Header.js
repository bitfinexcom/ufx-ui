import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Classes, Tooltip } from '@ufx-ui/core'
import cx from 'classnames'
import _get from 'lodash/get'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { EditLayoutButtonContainer as EditLayoutButton } from '../../../containers'
import withI18nProvider from '../../../hoc/withI18nProvider'
import { MOVEMENT_TYPES } from '../../../utils/movements'

const isTradingPage = (pathname) => pathname === '/' || pathname.startsWith('/t') || pathname.startsWith('/trading')

const Header = (props) => {
  const pathname = _get(props, ['location', 'pathname'])
  const isTrading = isTradingPage(pathname)
  const { t } = useTranslation()

  return (
    <div className={Classes.PAGE_HEADER}>
      <div className='left'>
        <div className='trading-heading'>
          <Link to='/trading' className={cx({ active: isTrading })}>
            {t('trading:title')}
          </Link>
        </div>
      </div>
      <div className='right'>
        <div className='wallets-heading'>
          <Tooltip
            placement='bottom'
            persistent
            className={`${Classes.TRADING}__walletlist`}
            content={(
              <div className='list'>
                <Link to={`/${MOVEMENT_TYPES.DEPOSITS}`}>
                  {t('deposits:title')}
                </Link>
                <Link to={`/${MOVEMENT_TYPES.WITHDRAWALS}`}>
                  {t('withdrawals:title')}
                </Link>
              </div>
          )}
          >
            <div className='title'>
              {t('wallets:title')}
              <FontAwesomeIcon icon={faChevronDown} size='sm' />
            </div>
          </Tooltip>
        </div>
        {isTrading && (
          <EditLayoutButton />
        )}
      </div>
    </div>
  )
}

export default withI18nProvider(memo(Header))
