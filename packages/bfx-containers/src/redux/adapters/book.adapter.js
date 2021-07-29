import _isArray from 'lodash/isArray'
import _pickBy from 'lodash/pickBy'
import _reduce from 'lodash/reduce'
import _size from 'lodash/size'

const getId = (row = {}) => row.price

const adapter = (data = []) => {
  const [
    price,
    count,
    amount,
  ] = data

  return {
    price,
    count,
    amount,
  }
}

const isBid = (row = {}) => row.amount > 0

const snapshot = (payload = [], args = {}) => {
  const { getRawData } = args
  const rawData = getRawData(payload)
  const asks = {}
  const bids = {}

  const rawDataLen = rawData.length
  for (let i = 0; i < rawDataLen; i += 1) {
    const row = adapter(rawData[i])
    const id = getId(row)
    if (isBid(row)) {
      bids[id] = row
    } else {
      asks[id] = row
    }
  }

  return {
    asks,
    bids,
  }
}

const updateRow = (rawData, state = {}, opts = {}) => {
  const {
    getSides,
    isBookTop = false,
  } = opts
  const row = adapter(rawData)
  const id = getId(row)
  const { side, other } = getSides(row, isBid)

  // delete the price level
  if (row.count <= 0 && !isBookTop) {
    const { [id]: omitted, ...remaining } = state[side]
    return {
      ...state,
      [side]: remaining,
    }
  }

  // add/update the price level
  const sideDataUpdated = {
    ...state[side],
    [id]: row,
  }
  const { [id]: omitted, ...remaining } = state[other]

  const sideData = (isBookTop && _size(sideDataUpdated) > 1)
    ? _pickBy(sideDataUpdated, ({ count }) => count > 0)
    : sideDataUpdated

  const otherData = (isBookTop && _size(remaining) > 1)
    ? _pickBy(remaining, ({ count }) => count > 0)
    : remaining

  return {
    ...state,
    [side]: sideData,
    [other]: otherData,
  }
}

function update(payload = [], state, opts = {}) {
  const {
    getRawData,
  } = opts
  const raw = getRawData(payload)

  // bulk update
  if (_isArray(raw[0])) {
    return _reduce(raw, (newState, rawRow) => updateRow(rawRow, newState, opts), state)
  }

  // update single row
  return updateRow(raw, state, opts)
}

export default {
  snapshot,
  update,
}
