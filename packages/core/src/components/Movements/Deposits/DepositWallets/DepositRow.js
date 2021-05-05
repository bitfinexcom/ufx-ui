import {
  faCopy, faQrcode, faSync,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { copyToClipboard } from '@ufx-ui/utils'
import _capitalize from 'lodash/capitalize'
import _startCase from 'lodash/startCase'
import PropTypes from 'prop-types'
import React, { memo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Tooltip, Heading, Button, QRCode, Dialog, Input,
} from '../../../ui'
import { NOT_ENABLED, NONE_GENERATED } from '../constants'

const DepositRow = ({
  currency,
  wallet,
  walletNames,
  requestWalletAddress,
  errorMessage,
}) => {
  const {
    address: addr = null,
    name,
  } = wallet
  const { t } = useTranslation('deposits')

  const [address, setAddress] = useState(addr)
  const notEnabled = address && NOT_ENABLED.test(address)
  const noAddress = !address || address === NONE_GENERATED
  useEffect(() => {
    setAddress(addr)
  }, [addr])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const updateWalletAddress = () => {
    if (notEnabled) {
      return
    }

    requestWalletAddress({
      name,
      address,
      notEnabled,
      setAddress,
    })
  }

  const copy = () => {
    if (notEnabled || noAddress) {
      return
    }

    copyToClipboard(address)
  }

  const showQrCode = () => {
    if (notEnabled || noAddress) {
      return
    }

    setIsModalOpen(true)
  }

  return (
    <>
      {!address && errorMessage && <div>{errorMessage}</div>}

      {address && (
        <div className='deposit-row'>
          <div>
            <Heading tag='h6'>
              {_capitalize(walletNames[name])}
            </Heading>

            <div className='deposit-address'>
              {noAddress
                ? (
                  <Button
                    minimal
                    small
                    onClick={updateWalletAddress}
                  >{t('generate_address')}
                  </Button>
                ) : (
                  <Input
                    small
                    disabled={notEnabled}
                    readOnly
                    value={address}
                  />
                )}
            </div>
          </div>

          <div className='actions'>
            <Button
              small
              onClick={copy}
              disabled={notEnabled || noAddress}
            >
              <Tooltip content={t('common:copy_to_clipboard')} placement='top'>
                <FontAwesomeIcon icon={faCopy} />
              </Tooltip>
            </Button>

            <Button
              small
              type='button'
              onClick={updateWalletAddress}
              disabled={notEnabled || noAddress}
            >
              <Tooltip content={t('change_address')} placement='top'>
                <FontAwesomeIcon icon={faSync} />
              </Tooltip>
            </Button>

            <Button
              small
              type='button'
              onClick={showQrCode}
              disabled={notEnabled || noAddress}
            >
              <Tooltip content={t('scan_qr_code')} placement='top'>
                <FontAwesomeIcon icon={faQrcode} />
              </Tooltip>
            </Button>

          </div>

        </div>
      )}

      <Dialog
        title={_startCase(`${name} ${t('wallet')} (${currency})`)}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className='qr-code-modal'>
          <QRCode value={address} className='qr-code' />
          <br />
          <div className='address'>
            {address}
          </div>
        </div>
      </Dialog>
    </>
  )
}

DepositRow.propTypes = {
  currency: PropTypes.string.isRequired,
  wallet: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  requestWalletAddress: PropTypes.func.isRequired,
  walletNames: PropTypes.objectOf(PropTypes.string).isRequired,
  errorMessage: PropTypes.string,
}

DepositRow.defaultProps = {
  errorMessage: null,
}

export default memo(DepositRow)
