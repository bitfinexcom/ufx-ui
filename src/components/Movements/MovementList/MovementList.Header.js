import React, { memo } from 'react'

import COLUMNS from './MovementList.columns'

const MovementListHeader = () => (
  <thead>
    <tr>
      {COLUMNS.map(({ key, getLabel }) => (
        <th key={key}>{getLabel()}</th>
      ))}
    </tr>
  </thead>
)

export default memo(MovementListHeader)
