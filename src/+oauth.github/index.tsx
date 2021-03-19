import IconCheck from "../helpers/icon/check"
import IconCross from "../helpers/icon/cross"
import Localized from "../helpers/localized"
import qs from "querystring"
import { Children, ReactNode, useEffect, useMemo } from "react"

export default () => {
  const { code, state, error } = useMemo(
    () =>
      qs.parse(location.search.slice(1)) as {
        code: string
        state: string
        error: string
      },
    []
  )
  const awaitedState = useMemo(() => localStorage.getItem("oauth:pending:github"), [])
  const errors = useMemo(
    () => [
      ...(awaitedState !== state
        ? [<Localized>Sorry, but application was not expecting authorization to happen</Localized>]
        : []),
      ...(!!error ? [error] : []),
    ],
    [state, error]
  )

  useEffect(() => {
    if (errors.length === 0) {
      fetch(
        `${process.env.OAUTH_ACCESS_TOKEN_URL_GITHUB}?client_id=${process.env.OAUTH_CLIENTID_GITHUB}&client_secret=${process.env.OAUTH_CLIENT_SECRET_GITHUB}&code=${code}`,
        {
          method: "POST",
        }
      )
    }
  }, [code, errors])

  return (
    <div className="fixed inset-0 flex flex-col bg bg-no-repeat bg-cover bg-center">
      {errors.length > 0 ? <Failure>{errors}</Failure> : <Success />}
    </div>
  )
}

const Success = () => (
  <div className="m-auto text-white 2xl:text-6xl md:text-5xl text-2xl">
    <IconCheck />
    <Localized>Success</Localized>
  </div>
)

const Failure = ({ children }: { children: ReactNode }) => (
  <>
    <div className="m-auto mb-0 text-white 2xl:text-6xl md:text-5xl text-2xl">
      <IconCross />
      <Localized>Failure</Localized>
    </div>
    <div className="m-auto mt-0 text-white flex flex-col items-center">
      {Children.map(children, (kid, i) => (
        <span key={i} className="2xl:text-xl md:text-lg text-base px-3 text-center">
          {kid}
        </span>
      ))}
    </div>
  </>
)
