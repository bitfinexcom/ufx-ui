/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types'
import React from 'react'

import { Dropdown } from '../../FormikFields'
import renderer from './TokenList.renderer'

const TokenList = (props) => (
  <Dropdown
    searchable
    valueRenderer={renderer}
    optionRenderer={renderer}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
)

TokenList.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
}

export default TokenList
