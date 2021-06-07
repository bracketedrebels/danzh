import { ChangeEventHandler, useCallback, useMemo, useState } from "react"
import { F } from "ts-toolbelt"

export default <T extends HTMLInputElement>(init: F.Parameters<ChangeEventHandler<T>>["0"]["target"]["value"]) => {
  const [ state, setState ] = useState(init);
  const eventSetter = useCallback<ChangeEventHandler<T>>((e) => {
    e.preventDefault()
    setState(e.target.value)
  }, [ setState ])
  return useMemo(() => [state, eventSetter] as const, [ state, eventSetter ]);
}