import { Dictionary } from "ramda"
import { Context, Dispatch, SetStateAction, useContext, useMemo } from "react"

export default <T extends Dictionary<string>>(
    context: Context<readonly [T, Dispatch<SetStateAction<T>>]>,
    storage: Storage
  ) =>
  (key: string) => {
    const [contextValue] = useContext(context)
    return useMemo(
      () => (key in contextValue ? contextValue[key] : storage.getItem(key)),
      [key, contextValue]
    )
  }
