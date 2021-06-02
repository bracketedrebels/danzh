import { Dictionary, omit } from "ramda"

export default (key: string | null, value: string | null) =>
  <T extends Dictionary<string>>(prev: T) =>
    !!key
      ? prev[key] === value
        ? prev
        : !!value
        ? { ...prev, [key]: value }
        : omit([key], prev)
      : ({} as Dictionary<string>)
