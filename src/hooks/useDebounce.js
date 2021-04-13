import _debounce from 'lodash/debounce'
import {
  useRef, useState, useCallback, useEffect,
} from 'react'

export const useDebouncedCallback = (callback, delay, options) => (
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useCallback(
    _debounce(callback, delay, options),
    [callback, delay, options],
  )
)

const useDebounce = (value, delay = 0, options) => {
  const previousValue = useRef(value)
  const [current, setCurrent] = useState(value)
  const debouncedCallback = useDebouncedCallback(setCurrent, delay, options)

  useEffect(() => {
    debouncedCallback(value)
    previousValue.current = value
    return debouncedCallback.cancel
  }, [debouncedCallback, value])

  return current
}

export default useDebounce
