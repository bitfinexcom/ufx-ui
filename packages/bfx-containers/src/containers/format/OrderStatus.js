import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip, Truncate } from '@ufx-ui/core'
import _capitalize from 'lodash/capitalize'
import _head from 'lodash/head'
import _trim from 'lodash/trim'
import PropTypes from 'prop-types'
import React from 'react'

const DONE_DELIMITER = 'was'
const RECORD_DELIMITER = ','
const AT_DELIMITER = '@'

const formatStatus = (status) => _capitalize(status.toLowerCase())

const recognizeMainStatus = (status) => {
  let mainStatus = _head(status.split(AT_DELIMITER))

  if (status.indexOf(DONE_DELIMITER) > 0) {
    mainStatus = _head(status.split(DONE_DELIMITER))
  }

  return _trim(mainStatus.replace(':', ''))
}

const recognizeRecords = (status) => {
  if (status.indexOf(DONE_DELIMITER) > 0) {
    const [, rest] = status.split(DONE_DELIMITER)
    return rest.split(RECORD_DELIMITER)
  }
  return status.split(RECORD_DELIMITER)
}

const OrderStatus = (props = {}) => {
  const { status } = props

  if (status.indexOf(RECORD_DELIMITER) >= 0 && status.length > 40) {
    const items = recognizeRecords(status)
    const mainStatus = formatStatus(recognizeMainStatus(status))

    return items.length > 0 ? (
      <>
        {`${mainStatus} `}
        <Tooltip
          content={(
            <div>
              {items.map((item) => (
                <div key={item}>
                  -
                  {_trim(item.replace(':', ''))}
                </div>
              ))}
            </div>
          )}
          placement='left'
          persistent
        >
          <FontAwesomeIcon size='sm' icon={faInfoCircle} />
        </Tooltip>
      </>
    ) : <Truncate>{mainStatus}</Truncate>
  }

  return <Truncate>{formatStatus(status)}</Truncate>
}

OrderStatus.propTypes = {
  status: PropTypes.string.isRequired,
}

export default OrderStatus
