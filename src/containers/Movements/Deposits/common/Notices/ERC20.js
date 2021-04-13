import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { Notice, NOTICE_TYPES } from '../../../../../components/ui'

const ERC20 = (props) => {
  const { currency, currencyLabel: label } = props
  const { t } = useTranslation('deposits')

  return (
    <Notice type={NOTICE_TYPES.WARNING}>
      {t('warnings.erc20_only', { currency, label })}
    </Notice>
  )
}

ERC20.propTypes = {
  currency: PropTypes.string.isRequired,
  currencyLabel: PropTypes.string.isRequired,
}

export default memo(ERC20)
