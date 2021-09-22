import { useState, useEffect } from 'react'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getSize)
  const isClient = typeof window === 'object'

  const getSize = () => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }
  }

  useEffect(() => {
    if (!isClient) {
      return false
    }

    const handleResize = () => {
      const newSize = getSize()
      if (
        windowSize.height !== newSize.height ||
        windowSize.width !== newSize.width
      ) {
        setWindowSize(newSize)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}
