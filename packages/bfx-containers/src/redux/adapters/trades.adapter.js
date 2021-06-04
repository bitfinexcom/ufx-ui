const tradesAdapter = (data = []) => {
  const [
    id, mts, amount, price,
  ] = data

  return {
    id,
    mts,
    amount,
    price,
  }
}

export default tradesAdapter
