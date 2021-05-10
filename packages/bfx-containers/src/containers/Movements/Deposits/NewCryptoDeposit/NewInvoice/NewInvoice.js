import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Intent, Button, Dropdown, Tooltip, Heading, QRCode,
  Classes,
  getNiceWalletName,
} from '@ufx-ui/core'
import { copyToClipboard } from '@ufx-ui/utils'
import Big from 'bignumber.js'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import Slider from 'rc-slider'
import React, {
  memo, useMemo, useRef, useState, useEffect,
} from 'react'
import { useTranslation } from 'react-i18next'

import { requestGenerateInvoice } from '../../../../../api/movements'
import { CcyUSDAmountInput } from '../../../common'
import { NOT_ENABLED } from '../../../constants'

const NewInvoice = ({
  currency,
  currencySymbol,
  minLnx,
  maxLnx,
  wallets,
  invoices,
  notifyError,
  dispatch,
}) => {
  const { t } = useTranslation('deposits')
  const [amount, setAmount] = useState(minLnx.toString())
  const [amountError, setAmountError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [invoice, setInvoice] = useState('')
  const [wallet, setWallet] = useState('')
  const [walletError, setWalletError] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [sliderValue, setSliderValue] = useState('0')
  const invoiceWrapperRef = useRef(null)

  useEffect(() => {
    // sets initial wallet select value
    setWallet(_get(wallets, '0.name', ''))
  }, [wallets])

  const { marks, intervalBetweenEachMark } = useMemo(() => {
    const interval = new Big(maxLnx).minus(minLnx).div(100)
    const res = {
      0: `${minLnx} BTC`,
      100: `${maxLnx} BTC`,
    }
    if (maxLnx < minLnx) {
      return res
    }
    const bigMin = new Big(minLnx)
    for (let i = 20; i < 100; i += 20) {
      const entry = bigMin.plus(interval.multipliedBy(i))
      res[i] = `${entry.toFixed(3)} BTC`
    }
    return { marks: res, intervalBetweenEachMark: interval }
  }, [minLnx, maxLnx])

  const handleSliderChange = (mark) => {
    setSliderValue(mark)
    if (mark === 100 && Number(amount) >= maxLnx) {
      return
    }
    const newAmount = mark === 0
      ? minLnx
      : new Big(mark).multipliedBy(intervalBetweenEachMark).plus(minLnx)
    setAmount(mark % 20 === 0 ? newAmount.toFixed(3) : newAmount.toString())
  }

  const handleAmountChange = (value) => {
    setAmount(value)
    const newSliderValue = new Big(value).minus(minLnx).div(intervalBetweenEachMark)
    setSliderValue(newSliderValue.toString())
  }

  const generateInvoice = () => {
    setIsCopied(false)
    let error = false
    if (Number(amount) < minLnx || Number(amount) > maxLnx) {
      setAmountError(t('movements:errors.invalid_invoice_amount', {
        min: minLnx,
        max: maxLnx,
      }))
      error = true
    } else {
      setAmountError(null)
    }

    if (!wallet) {
      setWalletError(t('movements:errors.required_field'))
      error = true
    } else {
      setWalletError(null)
    }

    if (error) {
      return
    }

    setSubmitting(true)

    requestGenerateInvoice({
      amount,
      wallet,
      method: currency,
      currency,
    })
      .then((res) => {
        const { data = {} } = res
        const newInvoice = _get(data, 2)
        setInvoice(newInvoice)

        if (invoiceWrapperRef.current) {
          invoiceWrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      })
      .catch((e) => {
        dispatch(notifyError(_get(e, 'response.data.message', e.message)))
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handleCopyClick = () => {
    copyToClipboard(invoice)
    setIsCopied(true)
  }

  const walletOptions = useMemo(() => (
    wallets.reduce(
      (acc, { address = '', name }) => {
        if (!address.match(NOT_ENABLED)) {
          acc[name] = `${getNiceWalletName(name)} ${t('wallet')}`
        }
        return acc
      }, {},
    )
  ), [t, wallets])

  return (
    <div className={Classes.NEW_INVOICE}>
      <div className='lnx-deposit'>
        <div>
          {t('send_to_invoice', { currency: currencySymbol })}
          {t('send_to2')}
        </div>

        <Slider
          step={1}
          min={0}
          max={100}
          marks={marks}
          className='lnx-slider'
          onChange={handleSliderChange}
          value={sliderValue}
        />

        <CcyUSDAmountInput
          currency={currency}
          symbol='BTC'
          value={amount.toString()}
          onChange={handleAmountChange}
          showUsdEquivalent
          error={amountError}
        />

        <div className='wallet-select-wrapper'>
          <div className='label'>
            {t('wallet')}
          </div>

          <div className='wallet-select'>
            <Dropdown
              options={walletOptions}
              value={wallet}
              onChange={setWallet}
              placeholder={t('wallet_select')}
            />
            <div className={Classes.ERROR_TEXT}>
              {walletError}
            </div>
          </div>
        </div>

        <div className='gen-invoice'>
          <Button
            small
            intent={Intent.SUCCESS}
            onClick={generateInvoice}
            disabled={submitting}
          >
            {t('generate_invoice')}
          </Button>
        </div>
      </div>

      <div className={Classes.DIVIDER} />

      <div className='invoice-qrcode' ref={invoiceWrapperRef}>
        {invoice && (
          <>
            {!invoices[invoice] && (
            <>
              <Heading tag='h4'>{t('pay_invoice')}</Heading>
              <div>{t('scan_invoice')}</div>
              <QRCode
                value={invoice}
                className='qrcode'
              />
            </>
            )}

            {invoices[invoice] && (
              <>
                <Heading tag='h4'>{t('deposit_complete')}</Heading>
                <div>
                  {t('movements:address')}
                  :
                  {' '}
                  {invoices[invoice].address}
                </div>
              </>
            )}

            <div>
              <Tooltip content={isCopied ? t('common:copied') : t('common:copy')}>
                <Button
                  small
                  minimal
                  onClick={handleCopyClick}
                  className='copy'
                >
                  <FontAwesomeIcon icon={faCopy} />
                </Button>
              </Tooltip>
            </div>

            <div className='lightning-address'>
              <a href={`lightning:${invoice}`}>
                {invoice}
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

NewInvoice.propTypes = {
  currency: PropTypes.string.isRequired,
  minLnx: PropTypes.number.isRequired,
  maxLnx: PropTypes.number.isRequired,
  invoices: PropTypes.shape({
    invoice: PropTypes.shape({
      invoice: PropTypes.string,
      address: PropTypes.string,
    }),
  }),
  wallets: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
  })),
  currencySymbol: PropTypes.string.isRequired,
  notifyError: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
}

NewInvoice.defaultProps = {
  wallets: {},
  invoices: {},
}

export default memo(NewInvoice)
