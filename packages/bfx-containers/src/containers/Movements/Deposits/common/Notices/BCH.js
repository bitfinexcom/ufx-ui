import { Notice, NOTICE_TYPES } from '@ufx-ui/core'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

const BCH = (props) => {
  const { currency, currencyLabel: label } = props
  const { t } = useTranslation('deposits')

  return (
    <Notice type={NOTICE_TYPES.WARNING}>
      {t('warnings.bch', { currency, label })}
    </Notice>
  )
}

BCH.propTypes = {
  currency: PropTypes.string.isRequired,
  currencyLabel: PropTypes.string.isRequired,
}

export default memo(BCH)
