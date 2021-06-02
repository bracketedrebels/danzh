import { parse } from "querystring"
import { isArray } from "ramda-adjunct"
import { useMemo } from "react"
import { useLocation } from "react-router"

export default (key: string) => {
  const { search } = useLocation()
  const potentialValue = useMemo(() => parse(search.slice(1))[key], [search, key])
  return useMemo(
    () => (isArray(potentialValue) ? potentialValue : [potentialValue]),
    [potentialValue]
  )
}
