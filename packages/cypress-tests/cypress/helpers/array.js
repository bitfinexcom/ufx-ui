export const isSorted = (arr, sortAsc = true) => {
  const limit = arr.length - 1
  return arr.every((_, i) => (i < limit
    ? sortAsc ? arr[i] <= arr[i + 1] : arr[i] >= arr[i + 1]
    : true))
}

export const isPositive = (arr) => arr.every((value) => value >= 0)
