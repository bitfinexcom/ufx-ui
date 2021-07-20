/* eslint-disable import/prefer-default-export */
import _sum from 'lodash/sum'
import _uniq from 'lodash/uniq'

export const SOCKET_FLAGS = _sum(_uniq([
  // 131072, // Enable book checksum messages
  536870912, // Enable order book bulk updates
]))
