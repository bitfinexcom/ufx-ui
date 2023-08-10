import { PROP_DEFAULT_CCYS, Ticker } from '@ufx-ui/core'
import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { getDataMapping } from './Ticker.helpers'
import useCommonBfxData from '../../hooks/useCommonBfxData'
import useTickers from '../../hooks/useTickers'
import { getCurrencySymbol } from '../../redux/selectors/currencies.selectors'
import { getTicker } from '../../redux/selectors/ticker.selectors'

const TickerContainer = (props) => {
  const {
    baseCcy,
    quoteCcy,
    ...rest
  } = props
  useTickers()

  const { symbol } = useCommonBfxData(baseCcy, quoteCcy)
  const data = useSelector(getTicker)(symbol)
  const getCcySymbol = useSelector(getCurrencySymbol)
  const dataMapping = useMemo(() => getDataMapping(getCcySymbol(baseCcy), getCcySymbol(quoteCcy)), [baseCcy, quoteCcy, getCcySymbol])

  return (
    <Ticker
      data={data}
      dataMapping={dataMapping}
      /* eslint-disable react/jsx-props-no-spreading */
      {...rest}
    />
  )
}

TickerContainer.propTypes = PROP_DEFAULT_CCYS.props

TickerContainer.defaultProps = PROP_DEFAULT_CCYS.defaults

export default memo(TickerContainer)
