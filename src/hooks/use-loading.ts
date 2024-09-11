import { useEffect, useState } from 'react'

type Props = {
  delay: number
}

export function useLoading({ delay = 1 }: Props = { delay: 1 }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  return isLoading
}
