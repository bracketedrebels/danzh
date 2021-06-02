import { Dictionary } from "ramda"
import { noop } from "ramda-adjunct"
import { createContext, Dispatch, SetStateAction } from "react"

export default createContext([
  {} as Dictionary<string>,
  noop as Dispatch<SetStateAction<any>>,
] as const)
