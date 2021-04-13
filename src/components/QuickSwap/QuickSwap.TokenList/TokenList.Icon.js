import PropTypes from 'prop-types'
import React from 'react'

import { ReactComponent as BTC } from '../../../images/tokens/btc.svg'
import { ReactComponent as Dapp } from '../../../images/tokens/dapp.svg'
import { ReactComponent as Emanate } from '../../../images/tokens/emanate.svg'
import { ReactComponent as EOS } from '../../../images/tokens/eos.svg'
import { ReactComponent as EOSDT } from '../../../images/tokens/eosdt.svg'
import { ReactComponent as ETH } from '../../../images/tokens/eth.svg'
import { ReactComponent as IQ } from '../../../images/tokens/iq.svg'
import { ReactComponent as LEO } from '../../../images/tokens/leo.svg'
import { ReactComponent as NUT } from '../../../images/tokens/nut.svg'
import { ReactComponent as PlaceholderIcon } from '../../../images/tokens/placeholder.svg'
import { ReactComponent as USD } from '../../../images/tokens/usd.svg'
import { ReactComponent as USDT } from '../../../images/tokens/usdt.svg'

const icons = {
  btc: BTC,
  eth: ETH,
  dapp: Dapp,
  emanate: Emanate,
  eos: EOS,
  eosdt: EOSDT,
  iq: IQ,
  leo: LEO,
  nut: NUT,
  usd: USD,
  usdt: USDT,
}

const TokenListIcon = (props) => {
  const { icon } = props
  const TokenIcon = icons[icon] || PlaceholderIcon

  return (
    <TokenIcon />
  )
}

TokenListIcon.propTypes = {
  icon: PropTypes.string.isRequired,
}

export default TokenListIcon
