import { getDecimalsForSymbol } from '@ufx-ui/utils'
import React from 'react'

import { KEYS } from './MovementList.constants'
import * as Classes from '../../../common/classes'
import { i18n } from '../../../i18n'
import { PrettyDate, FullDate, PrettyValue } from '../../format'

const COLUMNS = [{
  key: KEYS.ID,
  getLabel: () => i18n.t('movements:id'),
}, {
  key: KEYS.DATE,
  getLabel: () => i18n.t('movements:date'),
  renderer: ({ value: mts } = {}) => (
    <div>
      <PrettyDate mts={mts} abbreviate monthDayOnly />
      <br />
      <span className={Classes.TEXT_MUTED}>
        <FullDate ts={mts} />
      </span>
    </div>
  ),
}, {
  key: KEYS.STATUS,
  getLabel: () => i18n.t('movements:status'),
}, {
  key: KEYS.AMOUNT,
  getLabel: () => i18n.t('movements:amount'),
  renderer: ({ value, data }) => {
    const { currency } = data

    return (
      <div>
        <PrettyValue value={Math.abs(value)} decimals={getDecimalsForSymbol(currency)} />
        {' '}
        <span className={Classes.TEXT_MUTED}>{currency}</span>
      </div>
    )
  },
}, {
  key: KEYS.TYPE,
  getLabel: () => i18n.t('movements:type'),
}]

export default COLUMNS
