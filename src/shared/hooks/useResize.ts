import { useEffect, useState } from 'react'

export const useResize = () => {
  const [innerHeight, setInnerHeight] = useState<number>(0)

  useEffect(() => {
    setInnerHeight(window.innerHeight)

    const handleResize = () => {
      setInnerHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { innerHeight }
}
