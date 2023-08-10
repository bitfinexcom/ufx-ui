import { getValue } from '@ufx-ui/utils'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import COLUMNS from './MovementList.columns'
import { DATA_MAPPING } from '../../../common/props'

const MovementListRow = (props) => {
  const { data, rowMapping: customMapping } = props

  const getDisplayValue = getValue({
    customMapping,
    data,
  })

  return (
    <tr>
      {COLUMNS.map(({ key, renderer: defRenderer }) => {
        const formattedValue = getDisplayValue(key)
        const value = getDisplayValue(key, false)
        const renderer = _get(customMapping, [key, 'renderer'], defRenderer)

        return (
          <td key={key}>
            {renderer ? renderer({
              value,
              formattedValue,
              data,
            }) : formattedValue}
          </td>
        )
      })}
    </tr>
  )
}

MovementListRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
}

MovementListRow.defaultProps = {
  data: {},
  rowMapping: {},
}

export default memo(MovementListRow)
