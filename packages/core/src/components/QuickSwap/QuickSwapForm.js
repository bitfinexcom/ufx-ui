import { PLATFORM_SETTINGS } from '@ufx-ui/utils'
import Big from 'bignumber.js'
import { Field, Form, useFormikContext } from 'formik'
import _isNaN from 'lodash/isNaN'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation, Trans } from 'react-i18next'

import AmountInput from './QuickSwap.Amount'
import QuickSwapRate from './QuickSwap.Rate'
import QuickSwapToggle from './QuickSwap.Toggle'
import * as Classes from '../../common/classes'
import Intent from '../../common/intent'
import { Checkbox } from '../FormikFields'
import { Button, Heading } from '../ui'

const { AMOUNT_DECIMALS } = PLATFORM_SETTINGS

const QuickSwapForm = (props) => {
  const {
    tokenList,
    getConversionRate,
    termsUrl,
  } = props
  const { t } = useTranslation(['quickswap'])
  const { values, setFieldValue } = useFormikContext()
  const {
    fromToken: from, toToken: to,
  } = values

  const handleFromAmountChange = (fromAmount) => {
    if (!fromAmount || _isNaN(Number(fromAmount))) {
      setFieldValue('toAmount', '')
    } else {
      const amount = new Big(fromAmount).multipliedBy(getConversionRate({ from, to })).decimalPlaces(AMOUNT_DECIMALS).toString()
      setFieldValue('toAmount', amount)
    }
  }

  const handleToAmountChange = (toAmount) => {
    if (!toAmount || _isNaN(Number(toAmount))) {
      setFieldValue('fromAmount', '')
    } else {
      const amount = new Big(toAmount).dividedBy(getConversionRate({ from, to })).decimalPlaces(AMOUNT_DECIMALS).toString()
      setFieldValue('fromAmount', amount)
    }
  }

  const checkbox = (
    <div>
      <Trans
        i18nKey='quickswap:accept_terms'
        components={
          [
            <a
              href={termsUrl}
              target='_black'
              onClick={(e) => e.stopPropagation()}
            >Terms
            </a>,
          ]
        }
      />
    </div>
  )

  return (
    <Form className={Classes.QUICKSWAP}>
      <Heading
        intent={Intent.SUCCESS}
        tag='h3'
        alignText='center'
        className='title'
      >{t('title')}
      </Heading>
      <AmountInput
        label={t('from_label')}
        name='fromAmount'
        otherName='toAmount'
        dropdownName='fromToken'
        dropdownClassName='from-token'
        className='from-amount'
        tokenList={tokenList}
        handleAmountChange={handleFromAmountChange}
      />
      <QuickSwapToggle />
      <AmountInput
        label={t('to_label')}
        name='toAmount'
        otherName='fromAmount'
        dropdownName='toToken'
        dropdownClassName='to-token'
        tokenList={tokenList}
        className='to-amount'
        handleAmountChange={handleToAmountChange}
      />
      <QuickSwapRate getConversionRate={getConversionRate} />
      <Field
        component={Checkbox}
        name='acceptedTerms'
        label={checkbox}
        className='accept-terms'
      />
      <Button
        type='submit'
        className='swap-button'
        intent={Intent.SUCCESS}
      > {t('swap_now')}
      </Button>
    </Form>
  )
}

QuickSwapForm.propTypes = {
  tokenList: PropTypes.objectOf(PropTypes.string),
  getConversionRate: PropTypes.func,
  termsUrl: PropTypes.string,
}

QuickSwapForm.defaultProps = {
  tokenList: {},
  getConversionRate: () => { },
  termsUrl: '',
}

export default QuickSwapForm
