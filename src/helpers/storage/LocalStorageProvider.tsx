import { Dictionary, toPairs } from "ramda"
import { ReactNode, useCallback, useState } from "react"
import useWindowEventListener from "../useWindowEventListener"
import localStorageContext from "./localStorageContext"
import onStorageUpdateValueSetter from "./onStorageUpdateValueSetter"

export default ({ children = null as ReactNode }) => {
  const [state, setState] = useState({} as Dictionary<string>)
  const persistStorage = useCallback(
    () => toPairs(state).forEach(([k, v]) => localStorage.setItem(k, v)),
    [state]
  )
  const onStorageUpdated = useCallback(
    (e: StorageEvent) =>
      e.storageArea === localStorage && setState(onStorageUpdateValueSetter(e.key, e.newValue)),
    [setState]
  )
  useWindowEventListener("storage", onStorageUpdated)
  useWindowEventListener("beforeunload", persistStorage)

  return (
    <localStorageContext.Provider value={[state, setState]}>
      {children}
    </localStorageContext.Provider>
  )
}
