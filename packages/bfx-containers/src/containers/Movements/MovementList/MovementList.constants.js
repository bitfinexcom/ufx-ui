/* eslint-disable import/prefer-default-export */
import {
  i18n, Classes, MOVEMENTLIST_KEYS, PrettyValue,
} from '@ufx-ui/core'
import { getDecimalsForSymbol } from '@ufx-ui/utils'
import React from 'react'

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
