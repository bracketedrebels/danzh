import { Dictionary } from "ramda"
import { isFunction } from "ramda-adjunct"
import { Context, Dispatch, SetStateAction, useCallback, useContext } from "react"

export default <T extends Dictionary<string>>(
  context: Context<readonly [T, Dispatch<SetStateAction<T>>]>,
  storage: Storage
) => {
  return (key: keyof T) => {
    const [, setContextValue] = useContext(context)
    return useCallback(
      (v) => {
        if (isFunction(v)) {
          setContextValue((prev) => {
            const newval =
              key in prev ? v(prev[key]) : v(storage.getItem(key as string) as T[keyof T])
            return prev[key] === newval
              ? prev
              : {
                  ...prev,
                  [key]: newval,
                }
          })
        } else {
          setContextValue((prev) => (prev[key] === v ? prev : { ...prev, [key]: v }))
        }
      },
      [key, setContextValue]
    ) as Dispatch<SetStateAction<T[typeof key] | null>>
  }
}
