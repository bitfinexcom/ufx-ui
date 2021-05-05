import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PLATFORM_SETTINGS } from '@ufx-ui/utils'
import React from 'react'

import { PrettyValue, Time } from '../format'
import { KEYS } from './Trades.constants'

const { AMOUNT_SIG_FIGS, PRICE_SIG_FIGS } = PLATFORM_SETTINGS

const TRADE_AMOUNT_DECIMALS = 4

// key: column key
// label: column header
// renderer: for content to be renderered inside td
const getColumns = (args = {}) => {
  const { t } = args

  return [
    {
      key: KEYS.ID,
      label: '',
      cellStyle: { width: '10%' },
      renderer: ({ isBuy }) => {
        const icon = isBuy
          ? faChevronUp
          : faChevronDown

        return <FontAwesomeIcon icon={icon} />
      },
    },
    {
      key: KEYS.MTS,
      label: t('trades:time'),
      cellStyle: { width: '30%' },
      renderer: ({ formattedValue }) => <Time mts={formattedValue} />,
    },
    {
      key: KEYS.AMOUNT,
      label: t('trades:amount'),
      cellStyle: { width: '30%' },
      renderer: ({ formattedValue }) => (
        <PrettyValue
          value={formattedValue}
          sigFig={AMOUNT_SIG_FIGS}
          decimals={TRADE_AMOUNT_DECIMALS}
          fadeTrailingZeros
          absolute
        />
      ),
    },
    {
      key: KEYS.PRICE,
      label: t('trades:price'),
      cellStyle: { width: '30%' },
      renderer: ({ formattedValue }) => (
        <PrettyValue
          value={formattedValue}
          sigFig={PRICE_SIG_FIGS}
          fadeTrailingZeros
        />
      ),
    },
  ]
}

export default getColumns
