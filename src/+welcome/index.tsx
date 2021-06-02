import { useCallback, useEffect, useMemo, useState } from "react"
import { useHistory } from "react-router"
import useLocalStorageValue from "../helpers/useLocalStorageValue"

const { open } = self

export default () => {
  const [provider, setProvider] = useState(undefined)
  const key = useMemo(() => `oauth.token.${provider}`, [provider])
  const authToken = useLocalStorageValue(key)
  const { push } = useHistory()

  const onLogInClick = useCallback(
    (prov) => () => {
      setProvider(prov)
      open(oauthLink(prov))
    },
    [setProvider]
  )

  const onDiscordClick = useMemo(() => onLogInClick("discord"), [onLogInClick])

  const signingIn = useMemo(() => !!provider && !authToken, [provider, authToken])
  const ready = useMemo(() => !!provider && !!authToken, [provider, authToken])

  useEffect(() => void ready && push("/reception"), [ready])

  return (
    <div className="backdrop-blur h-full px-16 bg-surface bg-opacity-70 flex flex-col justify-center">
      <div className="font-standout font-bold text-5xl sm:text-6xl 2xl:text-7xl filter-drop-shadow-md text-secondary text-opacity-70 px-5">
        DANZH
        <div className="font-sans font-normal text-base text-primary">State Management Tool</div>
      </div>
      <div className="mt-10 w-full">
        <button
          className="button-d20 transition-transform transform -rotate-90 duration-200 active:rotate-0"
          onClick={onDiscordClick}
          disabled={signingIn}
        >
          <svg
            width="36"
            viewBox="0 0 24 18"
            className="transform rotate-90 active:rotate-0 transition-transform p-4 box-content"
          >
            <path
              d="M20.7273 2.25C20.7273 2.25 18.2258 0.230625 15.2727 0L15.0065 0.549563C17.676 1.224 18.9011 2.18813 20.1818 3.375C17.9744 2.21287 15.7964 1.125 12 1.125C8.20364 1.125 6.02564 2.21287 3.81818 3.375C5.09891 2.18813 6.55636 1.116 8.99345 0.549563L8.72727 0C5.62909 0.300938 3.27273 2.25 3.27273 2.25C3.27273 2.25 0.479455 6.42712 0 14.625C2.81455 17.9736 7.09091 18 7.09091 18L7.98545 16.7715C6.46691 16.227 4.75418 15.2556 3.27273 13.5C5.03891 14.8781 7.70455 16.3125 12 16.3125C16.2955 16.3125 18.9611 14.8781 20.7273 13.5C19.2464 15.2556 17.5336 16.227 16.0145 16.7715L16.9091 18C16.9091 18 21.1855 17.9736 24 14.625C23.5205 6.42712 20.7273 2.25 20.7273 2.25ZM8.45455 12.375C7.39964 12.375 6.54545 11.3681 6.54545 10.125C6.54545 8.88188 7.39964 7.875 8.45455 7.875C9.50945 7.875 10.3636 8.88188 10.3636 10.125C10.3636 11.3681 9.50945 12.375 8.45455 12.375ZM15.5455 12.375C14.4905 12.375 13.6364 11.3681 13.6364 10.125C13.6364 8.88188 14.4905 7.875 15.5455 7.875C16.6004 7.875 17.4545 8.88188 17.4545 10.125C17.4545 11.3681 16.6004 12.375 15.5455 12.375Z"
              className="fill-current"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

const oauthLink = (provider: "discord") =>
  ({
    discord:
      "https://discord.com/api/oauth2/authorize?client_id=846309201064230932&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Foauth%2Fdiscord&response_type=code&scope=identify%20email",
  }[provider])
