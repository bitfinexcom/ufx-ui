import { Classes, Dropdown } from '@ufx-ui/core'
import _reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { TETHER_PROTOCOL_PROPS } from '../../Movements.props'

const TetherTransport = (props) => {
  const {
    tetherProtocols,
    method,
    setMethod,
  } = props
  const { t } = useTranslation('movements')

  const methodOptions = _reduce(tetherProtocols, (acc, protocol) => {
    const { method: value, description } = protocol
    acc[value] = description
    return acc
  }, {})

  return (

    <div className={Classes.TETHER_TRANSPORT}>
      <div className='label'>{t('transport')}</div>

      <Dropdown
        small
        options={methodOptions}
        value={method}
        onChange={setMethod}
        placeholder={t('select_prompt')}
      />
    </div>
  )
}

TetherTransport.propTypes = {
  tetherProtocols: TETHER_PROTOCOL_PROPS.isRequired,
  method: PropTypes.string,
  setMethod: PropTypes.func.isRequired,
}

TetherTransport.defaultProps = {
  method: null,
}

export default memo(TetherTransport)
