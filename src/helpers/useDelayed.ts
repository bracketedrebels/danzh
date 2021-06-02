import { useCallback, useEffect, useRef } from "react"

export default <T extends any[]>(callback: (...args: [...T]) => void, delay: number) => {
  const timeoutId = useRef<number>()
  const invoker = useCallback(
    (...args: [...T]) => {
      timeoutId.current = self.setTimeout(callback, delay, ...args)
    },
    [callback, delay]
  )
  useEffect(() => () => self.clearTimeout(timeoutId.current), [invoker])
  return invoker
}
