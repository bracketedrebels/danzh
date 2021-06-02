import { useEffect } from "react"

export default <T extends keyof WindowEventMap>(
  event: T,
  callback: (e: WindowEventMap[T]) => void
) =>
  useEffect(() => {
    window.addEventListener(event, callback)
    return () => window.removeEventListener(event, callback)
  }, [event, callback])
