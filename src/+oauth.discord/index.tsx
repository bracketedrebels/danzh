import { useCallback, useEffect } from "react"
import Localized from "../helpers/Localized"
import useCountdown from "../helpers/useCountdown"
import useDelayed from "../helpers/useDelayed"
import useLocationQueryValue from "../helpers/useLocationQueryValue"
import useWindowEventListener from "../helpers/useWindowEventListener"

export default () => {
  const [token] = useLocationQueryValue("code")
  const [error] = useLocationQueryValue("error")
  const [countdown, startCountdown] = useCountdown(5000)
  const startDelayedAutoclose = useDelayed(window.close, 5000)
  const beforeUnloadCallback = useCallback(
    () => token && localStorage.setItem(`oauth.token.discord`, token),
    [token]
  )

  useWindowEventListener("beforeunload", beforeUnloadCallback)
  useEffect(
    () => void error || (startDelayedAutoclose(), startCountdown()),
    [error, startDelayedAutoclose, startCountdown]
  )

  return error ? (
    <div className="fixed inset-0 flex place-content-center bg-background">
      <div className="bg-surface border-error border-0 border-b-2 p-5 text-primary">{error}</div>
    </div>
  ) : (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="pt-8 text-background-contrast font-sans font-normal text-sm m-auto">
        <Localized>
          This page will be closed automatically in {~~(countdown / 1000)} seconds.
        </Localized>
      </div>
    </div>
  )
}
