import cx from 'classnames'
import _get from 'lodash/get'
import _map from 'lodash/map'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import * as Classes from '../../../common/classes'
import { DATA_MAPPING } from '../../../common/props'
import withI18nProvider from '../../../hoc/withI18nProvider'
import { getMappedKey } from '../../../utils/data-mapping'
import { Table } from '../../ui'
import { KEYS } from './MovementList.constants'
import MovementListHeader from './MovementList.Header'
import MovementListRow from './MovementList.Row'

export const MovementList = (props) => {
  const {
    movements,
    rowMapping,
    className,
  } = props
  const classes = cx(Classes.MOVEMENT_LIST, className)
  const keyForId = getMappedKey(KEYS.ID, rowMapping)

  return (
    <div className={classes}>
      <div className={Classes.TABLE_WRAPPER}>
        <Table condensed striped>
          <MovementListHeader />
          <tbody>
            {_map(movements, movement => (
              <MovementListRow
                key={_get(movement, keyForId)}
                data={movement}
                rowMapping={rowMapping}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

MovementList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  movements: PropTypes.arrayOf(PropTypes.object),
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  className: PropTypes.string,
}

export const defaultProps = {
  movements: {},
  rowMapping: {},
  className: null,
}

MovementList.defaultProps = defaultProps

export default withI18nProvider(memo(MovementList))
