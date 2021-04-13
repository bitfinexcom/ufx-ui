const errorAdapter = (data = []) => {
  const [
    type,
    code,
    message,
  ] = data

  return {
    type,
    code,
    message,
  }
}

export default errorAdapter
