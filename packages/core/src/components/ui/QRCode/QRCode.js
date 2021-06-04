import PropTypes from 'prop-types'
import QRCodeUI from 'qrcode.react'
import React, { memo, forwardRef } from 'react'

// eslint-disable-next-line prefer-arrow-callback
const QRCode = forwardRef(function QRCode(props, ref) {
  const { value, className } = props

  return (
    <QRCodeUI ref={ref} value={value} className={className} />
  )
})

QRCode.propTypes = {
  /**
   * The value of the QRCode.
   */
  value: PropTypes.string.isRequired,
  /**
   * The className of the QRCode.
   */
  className: PropTypes.string,
}

QRCode.defaultProps = {
  className: null,
}

export default memo(QRCode)
