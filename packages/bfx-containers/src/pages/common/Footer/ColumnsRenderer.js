import { Column } from '@ufx-ui/core'
import cx from 'classnames'
import _filter from 'lodash/filter'
import _map from 'lodash/map'
import React from 'react'

import Renderer from './ContentRenderer'

const ColumnsRenderer = ({ columns, className }) => (
  <div className={cx(className)}>
    {_map(columns, (column, i) => {
      const rows = _filter(column, (c) => !c.disabled && c.type)
      return (
        <Column className='footer-col' key={`footer-el_${i}`}>
          <ul>
            {_map(rows, (row, j) => (
              <li key={`footer-el_${i}_${j}`} className={cx(row.className)}>
                <Renderer
                  content={row}
                  ns='footer'
                />
              </li>
            ))}
          </ul>
        </Column>
      )
    })}
  </div>
)

export default ColumnsRenderer
