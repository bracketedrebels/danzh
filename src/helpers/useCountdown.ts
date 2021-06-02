import { useCallback, useEffect, useRef, useState } from "react"

export default (start: number, step = 1000) => {
  const [left, setLeft] = useState(start)
  const intervalId = useRef<number>()
  const initiator = useCallback(() => {
    self.clearTimeout(intervalId.current)
    const decrement = () => setLeft((prev) => prev - step)
    intervalId.current = self.setInterval(decrement, step)
  }, [step])
  useEffect(() => {
    if (left <= 0) {
      self.clearTimeout(intervalId.current)
    }
  }, [left, initiator])
  useEffect(() => () => self.clearTimeout(intervalId.current), [])

  return [left, initiator] as const
}
