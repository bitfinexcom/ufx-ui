import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { DATA_MAPPING } from '../../common/props'
import { getValue } from '../../utils/data-mapping'

const BalancesRow = (props) => {
  const {
    data,
    dataMapping: customMapping,
    columns,
    handleDepositClick,
    handleWithdrawClick,
  } = props
  const getDisplayValue = getValue({
    customMapping,
    data,
  })

  return (
    <tr>
      {columns.map(column => {
        const {
          key, renderer: defRenderer, cellClassName, cellStyle,
        } = column || {}
        const value = getDisplayValue(key, false)
        const formattedValue = getDisplayValue(key)
        const renderer = _get(customMapping, [key, 'renderer'], defRenderer)

        return (
          <td key={key} className={cellClassName} style={cellStyle}>
            {renderer ? renderer({
              value,
              formattedValue,
              data,
              handleDepositClick,
              handleWithdrawClick,
            }) : formattedValue}
          </td>
        )
      })}
    </tr>
  )
}

BalancesRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  dataMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDepositClick: PropTypes.func,
  handleWithdrawClick: PropTypes.func,
}

BalancesRow.defaultProps = {
  data: {},
  dataMapping: {},
  handleDepositClick: () => {},
  handleWithdrawClick: () => {},
}

export default memo(BalancesRow)
