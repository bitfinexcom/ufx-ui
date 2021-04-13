import _toUpper from 'lodash/toUpper'

const detailAdapter = (data = []) => data.reduce(
  (out, d) => (
    {
      ...out,
      [`t${_toUpper(d.pair)}`]: {
        pricePrecision: d.price_precision,
        initialMargin: d.initial_margin,
        minMargin: d.minimum_margin,
        maxSize: d.maximum_order_size,
        minSize: d.minimum_order_size,
        expiration: d.expiration,
        margin: d.margin,
      },
    }
  ),
  {},
)

export default detailAdapter
