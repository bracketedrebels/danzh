import { useCallback } from "react"
import LoginIcon from "../helpers/icon/login"

export default () => {
  //   const [name, setName] = useState(null)

  //   useEffect(() => {
  //     let isMounted = true
  //     fetch(`
  //         query RepositoryNameQuery {
  //             repository(owner: "facebook" name: "relay") {
  //             name
  //             }
  //         }
  //     `)
  //       .then((response) => {
  //         if (!isMounted) {
  //           return
  //         }
  //         const data = response.data
  //         setName(data.repository.name)
  //       })
  //       .catch((error) => {
  //         console.error(error)
  //       })

  //     return () => {
  //       isMounted = false
  //     }
  //   }, [])

  const onGithubLoginClick = useCallback(() => {
    const array = new Uint32Array(8)
    const state = crypto.getRandomValues(array).join("")
    localStorage.setItem("oauth:pending:github", state)
    const link = `${process.env.OAUTH_AUTHORIZATION_URL_GITHUB}?client_id=${
      process.env.OAUTH_CLIENTID_GITHUB
    }&state=${state}&scope=repo&redirect_uri=${encodeURI(
      `${location.origin}${process.env.DEPLOY_BASENAME}oauth/github`
    )}`
    // console.log(link)
    window.location.assign(link)
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col items-stretch bg bg-no-repeat bg-cover bg-center">
      <div className="text-center flex flex-col items-center 2xl:items-end 2xl:pr-10 justify-center text-white flex-grow">
        <div className="font-standout text-5xl sm:text-8xl 2xl:text-9xl filter-drop-shadow-md">
          DANZH
          <div className="font-sans text-base sm:text-xl xl:text-2xl text-opacity-75">
            Tabletop games state management tool
          </div>
        </div>
        <div
          onClick={onGithubLoginClick}
          className="flex-nowrap flex-row flex items-center mt-10 text-xl font-standout p-3 rounded-full bg-white text-red-900"
        >
          <span className="w-8 h-8 mr-1">
            <LoginIcon />
          </span>
          github
        </div>
      </div>
    </div>
  )
}
