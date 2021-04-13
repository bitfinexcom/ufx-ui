/* eslint-disable import/prefer-default-export */
import types from '../constants/UI.constants'

export const loadSettings = (config) => ({
  type: types.UI_LOAD,
  payload: {
    config,
  },
})

export const set = ({ section, key, value }) => ({
  type: types.UI_SET,
  payload: {
    section,
    key,
    value,
  },
})
