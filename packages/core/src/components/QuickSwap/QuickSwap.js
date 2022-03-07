import { Formik } from 'formik'
import compose from 'lodash/fp/compose'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import withI18nProvider from '../../hoc/withI18nProvider'
import withResponsive from '../../hoc/withResponsive'
import {
  formSchema, validateForm, getInitialState,
} from './QuickSwap.helpers'
import QuickSwapForm from './QuickSwapForm'

export const QuickSwap = (props) => {
  const {
    tokenList,
    defaultFromToken,
    defaultToToken,
    onSwapClick,
    getAvailableBalance,
    getConversionRate,
    termsUrl,
  } = props
  const { t } = useTranslation(['quickswap'])

  return (
    <Formik
      initialValues={getInitialState(defaultFromToken, defaultToToken)}
      validate={validateForm(getAvailableBalance, t)}
      validationSchema={formSchema(t)}
      onSubmit={(values) => {
        onSwapClick(values)
      }}
    >
      <QuickSwapForm
        tokenList={tokenList}
        getConversionRate={getConversionRate}
        termsUrl={termsUrl}
      />
    </Formik>
  )
}

QuickSwap.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  /**
   * The object with available tokens,
   * 'key': 'label'
   */
  tokenList: PropTypes.objectOf(PropTypes.string),
  /**
   * The default token for sell
   */
  defaultFromToken: PropTypes.string,
  /**
   * The default token for buy
   */
  defaultToToken: PropTypes.string,
  /**
   * The function called, when user clicks on swap button
   */
  onSwapClick: PropTypes.func,
  /**
   * The function, fetching available balance
   */
  getAvailableBalance: PropTypes.func,
  /**
   * The function, fetching conversion rate
   */
  getConversionRate: PropTypes.func,
  /**
   * The link to terms and conditions page
   */
  termsUrl: PropTypes.string,
}

export const defaultProps = {
  tokenList: {},
  defaultFromToken: 'btc',
  defaultToToken: 'eth',
  onSwapClick: () => { },
  getAvailableBalance: () => { },
  getConversionRate: () => { },
  termsUrl: '',
}

QuickSwap.defaultProps = defaultProps

export default compose(withI18nProvider, withResponsive, memo)(QuickSwap)
