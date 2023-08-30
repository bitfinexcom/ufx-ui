import cx from 'classnames'
import { Field, useFormikContext } from 'formik'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import TokenList from './QuickSwap.TokenList'
import { Input } from '../FormikFields'

const AmountInput = (props) => {
  const {
    name,
    label,
    dropdownName,
    dropdownClassName,
    tokenList,
    className,
    handleAmountChange,
  } = props
  const {
    values, setFieldValue,
  } = useFormikContext()
  const value = _get(values, name)

  const handleOnChange = (val) => {
    setFieldValue(name, val)
    handleAmountChange(val)
  }

  const leftElement = (
    <Field
      name={dropdownName}
      options={tokenList}
      component={TokenList}
      className={cx('token-dropdown', dropdownClassName)}
    />
  )

  return (
    <Field
      component={Input}
      name={name}
      label={label}
      leftElement={leftElement}
      fieldsToValidate={[dropdownName]}
      // set type='text' to avoid formik validation issue with value like 1.1.1
      type='text'
      placeholder={0}
      alignText='right'
      className={className}
      onChange={handleOnChange}
      value={value}
    />
  )
}

AmountInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  dropdownName: PropTypes.string.isRequired,
  dropdownClassName: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  tokenList: PropTypes.object.isRequired,
  className: PropTypes.string,
}

AmountInput.defaultProps = {
  className: null,
  dropdownClassName: null,
}

export default memo(AmountInput)
