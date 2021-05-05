import { i18n, Checkbox } from '@ufx-ui/core'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

const CheckBoxRow = (props) => {
  const {
    label,
    value,
    message,
    onChangeHandler,
    errorMessage,
  } = props

  return (
    <div>
      <div>
        <Checkbox
          label={label}
          checked={value}
          onChange={onChangeHandler}
          small
          error={errorMessage}
        />
      </div>
      <div>
        {message}
      </div>
    </div>
  )
}

CheckBoxRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  message: PropTypes.node.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
}

CheckBoxRow.defaultProps = {
  label: i18n.t('common:yes'),
  value: false,
  errorMessage: null,
}

export default memo(CheckBoxRow)
