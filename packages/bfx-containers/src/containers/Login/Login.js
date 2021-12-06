import {
  Dialog, Input, Button, Intent, Classes,
} from '@ufx-ui/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import withI18nProvider from '../../hoc/withI18nProvider'
import { WSSubscribeAuthChannel } from '../../redux/actions/ws.actions'
import { saveAPICredentials } from '../../utils/authStorage'

const Login = (props) => {
  const { onClose, isOpen } = props
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [apiKeyError, setApiKeyError] = useState('')
  const [apiSecretError, setApiSecretError] = useState('')
  const dispatch = useDispatch()
  const { t } = useTranslation('login')

  const handleLoginClick = (e) => {
    e.stopPropagation()

    setApiKeyError('')
    setApiSecretError('')

    if (!apiKey || !apiSecret) {
      if (!apiKey) {
        setApiKeyError(t('apiKeyRequired'))
      }
      if (!apiSecret) {
        setApiSecretError(t('apiSecretRequired'))
      }

      return false
    }

    saveAPICredentials(apiKey, apiSecret)
    dispatch(WSSubscribeAuthChannel())
    setApiKey('')
    setApiSecret('')
    onClose()

    return true
  }

  const handleOnClose = (e) => {
    e.stopPropagation()
    setApiKey('')
    setApiSecret('')
    setApiKeyError('')
    setApiSecretError('')
    onClose()
  }

  return (
    <Dialog isOpen={isOpen} onClose={handleOnClose} title={t('title')}>
      <div className={Classes.LOGIN}>
        <div>
          <p className='text warning'>{t('warning')}</p>
          <div className='text warning'>{t('warningText')}</div>
        </div>
        <Input
          small
          type='password'
          autoComplete='off'
          name='apiKey'
          label={t('apiKey')}
          value={apiKey}
          onChange={setApiKey}
          error={apiKeyError}
        />
        <Input
          small
          type='password'
          autoComplete='off'
          name='apiKey'
          label={t('apiSecret')}
          value={apiSecret}
          onChange={setApiSecret}
          error={apiSecretError}
        />
        <Button
          small
          intent={Intent.SUCCESS}
          className='submit'
          onClick={handleLoginClick}
        >{t('login')}
        </Button>
      </div>
    </Dialog>
  )
}

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default withI18nProvider(Login)
