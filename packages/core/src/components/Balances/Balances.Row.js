import { getValue } from '@ufx-ui/utils'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { DATA_MAPPING } from '../../common/props'

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
          dataKey, renderer: defRenderer, cellClassName, cellStyle,
        } = column || {}
        const value = getDisplayValue(dataKey, false)
        const formattedValue = getDisplayValue(dataKey)
        const renderer = _get(customMapping, [dataKey, 'renderer'], defRenderer)

        return (
          <td key={dataKey} className={cellClassName} style={cellStyle}>
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
