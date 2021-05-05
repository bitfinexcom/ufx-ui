import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Classes } from '@ufx-ui/core'
import cx from 'classnames'
import _get from 'lodash/get'
import _toLower from 'lodash/toLower'
import _toUpper from 'lodash/toUpper'
import PropTypes from 'prop-types'
import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import {
  NewCryptoDepositContainer,
  NewTetherDepositContainer,
  NewCryptoWithdrawalContainer,
  NewTetherWithdrawalContainer,
  CurrencyListContainer,
} from '../../containers'
import { MOVEMENT_TYPES, MOVEMENT_SUBTYPES } from '../../utils/movements'

const Components = {
  [`${MOVEMENT_TYPES.DEPOSITS}_${MOVEMENT_SUBTYPES.CRYPTO}`]: NewCryptoDepositContainer,
  [`${MOVEMENT_TYPES.DEPOSITS}_${MOVEMENT_SUBTYPES.TETHER}`]: NewTetherDepositContainer,
  [`${MOVEMENT_TYPES.WITHDRAWALS}_${MOVEMENT_SUBTYPES.CRYPTO}`]: NewCryptoWithdrawalContainer,
  [`${MOVEMENT_TYPES.WITHDRAWALS}_${MOVEMENT_SUBTYPES.TETHER}`]: NewTetherWithdrawalContainer,
}

const NewMovement = (props) => {
  const { history, match, movementType } = props
  const params = _get(match, ['params'], {})
  const { subType: movementSubtype, baseCcy } = params
  const isDeposit = movementType === MOVEMENT_TYPES.DEPOSITS

  const { t } = useTranslation(isDeposit ? 'deposits' : 'withdrawals')
  const onCcyChange = useCallback(
    (ccy) => {
      history.push(`/${movementType}/${movementSubtype}/${_toLower(ccy)}`)
    },
    [history, movementType, movementSubtype],
  )

  const Component = Components[`${movementType}_${movementSubtype}`]

  return (
    <div className={cx(Classes.MOVEMENTS)}>
      <div className='header__wrapper'>
        <div className='header'>
          <Link to={`/${movementType}`}>{t('title')}</Link>
          <span className={Classes.TEXT_MUTED}>
            <FontAwesomeIcon icon={faChevronRight} size='xs' />
          </span>
        </div>
        <CurrencyListContainer
          className='currency-list'
          type={movementSubtype}
          value={_toUpper(baseCcy)}
          onChange={onCcyChange}
        />
      </div>
      <div className={cx(Classes.DIVIDER, 'divider')} />
      <Component baseCcy={baseCcy} />
    </div>
  )
}

NewMovement.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string,
      baseCcy: PropTypes.string,
    }),
  }),
}

NewMovement.defaultProps = {
  match: {},
}

export default memo(NewMovement)
