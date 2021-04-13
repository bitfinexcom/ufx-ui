/* eslint-disable import/prefer-default-export */
import React from 'react'

import * as Classes from '../../../common/classes'
import { MOVEMENTLIST_KEYS } from '../../../components'
import { PrettyValue } from '../../../components/format'
import { getDecimalsForSymbol } from '../../../functions/symbols'
import { i18n } from '../../../i18n'

export const MAPPING = {
  [MOVEMENTLIST_KEYS.DATE]: {
    selector: 'mts_start',
  },
  [MOVEMENTLIST_KEYS.AMOUNT]: {
    renderer: ({ value, data }) => {
      const { currency, fees } = data
      const isWithdraw = value < 0

      return (
        <div>
          <PrettyValue value={Math.abs(value)} decimals={getDecimalsForSymbol(currency)} />
          {' '}
          <span className={Classes.TEXT_MUTED}>{currency}</span>
          <br />
          {isWithdraw && (
            <span className={Classes.TEXT_MUTED}>
              ({i18n.t('movements:fee')}
              {': '}
              {Math.abs(fees)}
              )
            </span>
          )}
        </div>
      )
    },
  },
  [MOVEMENTLIST_KEYS.TYPE]: {
    renderer: ({ data }) => {
      const { amount } = data
      return amount > 0 ? i18n.t('movements:deposit') : i18n.t('movements:withdraw')
    },
  },
}
