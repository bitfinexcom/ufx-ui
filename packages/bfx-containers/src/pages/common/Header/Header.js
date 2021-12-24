import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Classes, Tooltip, Button } from '@ufx-ui/core'
import cx from 'classnames'
import _get from 'lodash/get'
import React, { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { EditLayoutButtonContainer as EditLayoutButton, Login } from '../../../containers'
import withI18nProvider from '../../../hoc/withI18nProvider'
import { getWSIsAuthenticated } from '../../../redux/selectors/ws.selectors'
import { removeAPICredentials } from '../../../utils/authStorage'
import { MOVEMENT_TYPES } from '../../../utils/movements'

const isTradingPage = (pathname) => pathname === '/' || pathname.startsWith('/t') || pathname.startsWith('/trading')

const Header = (props) => {
  const pathname = _get(props, ['location', 'pathname'])
  const isTrading = isTradingPage(pathname)
  const { t } = useTranslation()
  const [showLogin, setShowLogin] = useState(false)
  const isAuthenticated = useSelector(getWSIsAuthenticated)

  const handleLogoutClick = (e) => {
    e.stopPropagation()

    removeAPICredentials()
    // auth channel WSUnsubscribeAuthChannel call is made from useInjectBfxData

    // hard refresh page, so ws gets reconnected hence it avoids auth:dup error on next login
    setTimeout(() => {
      window.location.href = '/'
    }, 500)
  }

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
        {isAuthenticated
          ? <Button onClick={handleLogoutClick}>{t('login:logout')}</Button>
          : <Button onClick={() => setShowLogin(true)}>{t('login:login')}</Button>}
        <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
        {isAuthenticated && (
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
        )}
        {isTrading && (
          <EditLayoutButton />
        )}
      </div>
    </div>
  )
}

export default withI18nProvider(memo(Header))
