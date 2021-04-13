import { useRef, useEffect } from 'react'

// https://usehooks.com/usePrevious
const usePrevious = (value) => {
  const ref = useRef()

  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}

export default usePrevious
