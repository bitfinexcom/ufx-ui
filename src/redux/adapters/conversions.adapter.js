import _first from 'lodash/first'
import _last from 'lodash/last'

const rowAdapter = (data = []) => data
  .map((d) => ({ [_first(d)]: _last(d) }))
  .reduce((res, row) => ({ ...res, ...row }))

const conversionAdapter = (payload = []) => _first(
  payload.map((d) => d
    .map((c) => ({ [_first(c)]: rowAdapter(_last(c)) }))
    .reduce((res, row) => ({ ...res, ...row }))),
)

export default conversionAdapter
