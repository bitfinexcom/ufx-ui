export default function candlesAdapter(data = []) {
  const [mts, open, close, high, low, volume] = data
  return {
    mts,
    time: mts, // tradingview format for mts
    open,
    close,
    high,
    low,
    volume,
  }
}

export function snapshot(data = []) {
  const len = data.length
  const result = {}
  for (let i = 0; i < len; i += 1) {
    const candle = candlesAdapter(data[i])
    result[candle.mts] = candle
  }
  return result
}
