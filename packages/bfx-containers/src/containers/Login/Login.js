import {
  Dialog, Input, Button, Intent, Classes,
} from '@ufx-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import withI18nProvider from '../../hoc/withI18nProvider'
import { WSSubscribeAuthChannel } from '../../redux/actions/ws.actions'
import { saveAPICredentials } from '../../utils/authStorage'

const Login = (props) => {
  const { onClose, isOpen } = props
  const {
    handleSubmit, formState: { errors }, control, reset,
  } = useForm()

  const dispatch = useDispatch()
  const { t } = useTranslation('login')

  const handleLoginClick = (data) => {
    const { apiKey, apiSecret } = data

    saveAPICredentials(apiKey, apiSecret)
    dispatch(WSSubscribeAuthChannel())
    reset()
    onClose()
  }

  const handleOnClose = (e) => {
    e.stopPropagation()
    reset()
    onClose()
  }

  return (
    <Dialog isOpen={isOpen} onClose={handleOnClose} title={t('title')}>
      <form className={Classes.LOGIN} onSubmit={handleSubmit(handleLoginClick)}>
        <div>
          <p className='text warning'>{t('warning')}</p>
          <div className='text warning'>{t('warningText')}</div>
        </div>

        <Controller
          name='apiKey'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              small
              type='password'
              autoComplete='off'
              label={t('apiKey')}
              error={errors.apiKey?.type === 'required' ? t('apiKeyRequired') : ''}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...field}
            />
          )}
        />

        <Controller
          name='apiSecret'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              small
              type='password'
              autoComplete='off'
              label={t('apiSecret')}
              error={errors.apiSecret?.type === 'required' ? t('apiSecretRequired') : ''}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...field}
            />
          )}
        />

        <Button
          small
          intent={Intent.SUCCESS}
          className='submit'
          type='submit'
        >{t('login')}
        </Button>

      </form>
    </Dialog>
  )
}

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default withI18nProvider(Login)
