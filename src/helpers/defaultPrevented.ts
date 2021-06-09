import { EventHandler, SyntheticEvent } from "react"

export default <T, E extends Event>(cb: EventHandler<SyntheticEvent<T, E>>) =>
  (e: SyntheticEvent<T, E>) => {
    e.preventDefault()
    cb(e)
  }
