/* eslint-disable react/jsx-fragments */
/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */

// Customisation of https://github.com/doczjs/docz/blob/master/core/gatsby-theme-docz/src/components/Props/index.js

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as styles from 'gatsby-theme-docz/src/components/Props/styles'
import _entries from 'lodash/entries'
import _get from 'lodash/get'
import _replace from 'lodash/replace'
import { jsx } from 'theme-ui'

import * as TYPES from '../src/common/props'
import { Table } from '../src/components/ui'

const { isArray } = Array
const requiredTh = { textAlign: 'center' }
const requiredTd = {
  display: 'flex',
  justifyContent: 'center',
}
const descTd = { width: '40%' }

export const getDefaultValue = ({ defaultValue, type }) => {
  const propType = type
  let value = _get(defaultValue, 'value')
  value = _replace(value, 'Props.', '')

  if (!value || value === 'null') return ''
  if (propType && ['string', 'enum', 'number'].includes(propType.name)) {
    const custom = _get(TYPES, value)
    value = custom || value
    if (typeof value === 'number') {
      return value
    }
    return value.includes("'") ? value.replace(/'/g, '"') : `"${value}"`
  }
  if (typeof value === 'object' && value.toString) {
    return value.toString()
  }

  return value
}

const Type = ({ type }) => {
  const { name, raw, value } = type

  // Enum
  if (name === 'enum') {
    let values
    if (isArray(value)) {
      values = value.map(v => v.value)
    } else if (isArray(TYPES[value])) {
      values = TYPES[value]
    }

    if (values) {
      // TODO: use tag element
      return values.map(val => val).join(' | ')
    }
  }

  // Union
  if (name === 'union' && isArray(value)) {
    return value.map(v => v.name).join(' | ')
  }

  // Custom
  if (name === 'custom') {
    return raw
  }

  if (name === 'objectOf') {
    return 'object'
  }

  if (name === 'arrayOf') {
    return 'array'
  }

  // Fallback
  return name
}

export const Prop = ({ propName, prop }) => {
  if (!prop.type && !prop.flowType) return null

  return (
    <tr sx={styles.line} data-testid='prop'>
      <td sx={styles.propName} data-testid='prop-name'>
        <strong>
          {propName}
        </strong>
      </td>
      <td sx={styles.propType} data-testid='prop-type'>
        <Type type={prop.type} />
      </td>
      <td>
        <em>{prop.defaultValue && getDefaultValue(prop)}</em>
      </td>
      <td style={requiredTd}>
        {prop.required && (
          <FontAwesomeIcon
            icon={faCheckCircle}
            color='blue'
          />
        )}
      </td>
      <td style={descTd} sx={styles.defaultValue} data-testid='prop-default-value'>
        <div>
          {prop.description}
        </div>
      </td>
    </tr>
  )
}

export const Props = ({ props, getPropType }) => {
  const entries = _entries(props)

  return (
    <div sx={styles.container} data-testid='props'>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th style={requiredTh}>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([key, prop]) => (
            <Prop key={key} propName={key} prop={prop} getPropType={getPropType} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}
