import _find from 'lodash/find'
import _isEmpty from 'lodash/isEmpty'
import _startCase from 'lodash/startCase'
import _toUpper from 'lodash/toUpper'
import PropTypes from 'prop-types'
import React, { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import * as Classes from '../../../../common/classes'
import { getPoolAddress } from '../../../../redux/selectors/movements.selectors'
import { getPaymentIdLabel } from '../../../../utils/movements'
import { TetherInfoNotice, TetherTransport } from '../../common'
import { TETHER_PROTOCOL_PROPS } from '../../Movements.props'
import DepositWallets from '../common/DepositWallets'
import { PaymentId as PaymentIdNotice } from '../common/Notices'

const NewTetherDepositDetails = ({
  currency,
  currencySymbol,
  tetherProtocols,
  hasPaymentIdForDeposits,
}) => {
  const { t } = useTranslation('deposits')
  const [method, setMethod] = useState(null)

  const tetherProtocol = _find(tetherProtocols, data => data.method === method) || {}
  const hasPaymentId = hasPaymentIdForDeposits(tetherProtocol.ccy)
  const { cc_tx: ccTx, transport_ccy: transportCurrency, ccy } = tetherProtocol

  const paymentId = useSelector(state => getPoolAddress(state, transportCurrency))

  if (_isEmpty(tetherProtocols)) {
    return (<p>{t('no_active_tether')}</p>)
  }

  return (
    <>
      <TetherInfoNotice currency={currency} />

      <div className={Classes.ERROR_TEXT}>
        <strong>
          {t('warnings.send_to_ccy')}
        </strong>
      </div>

      <div>
        <p>{t('send_tether_protocol')}</p>
        <TetherTransport
          tetherProtocols={tetherProtocols}
          method={method}
          setMethod={setMethod}
        />
      </div>

      {method && <div>{t('send_to_tether')}</div>}

      {ccTx && (
        <>
          {hasPaymentId && (
            <PaymentIdNotice
              currency={ccy}
              currencySymbol={currencySymbol}
              paymentIdLabel={getPaymentIdLabel(ccy)}
              paymentId={paymentId}
            />
          )}

          <DepositWallets
            isTether
            currency={_toUpper(method)}
            errorMessage={t('daemon_down', { currency: _startCase(currency) })}
          />
        </>
      )}
    </>
  )
}

NewTetherDepositDetails.propTypes = {
  currency: PropTypes.string.isRequired,
  tetherProtocols: TETHER_PROTOCOL_PROPS,
  hasPaymentIdForDeposits: PropTypes.func.isRequired,
  currencySymbol: PropTypes.string.isRequired,
}

NewTetherDepositDetails.defaultProps = {
  tetherProtocols: [],
}

export default memo(NewTetherDepositDetails)
