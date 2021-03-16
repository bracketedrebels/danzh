import GithubIcon from "../helpers/icon/github"
import Logo from "../helpers/icon/logo"

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

  return (
    <>
      <div className="absolute inset-0 bg blend-luminosity" />
      <div
        className="
        relative flex flex-col items-center justify-center rounded-none w-full p-10
        bg-white bg-opacity-80 text-opacity-90"
      >
        <div className="mt-auto mx-0">
          <Logo />
          <div className="text-4xl text-black text-opacity-75">
            Tabletop games state management tool
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 my-3 text-5xl mt-auto">
          <div className="mb-4">Log in</div>
          <button className="inline-flex justify-center p-8 border border-transparent shadow-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <GithubIcon className="w-24 h-24" />
          </button>
        </div>
      </div>
    </>
  )
}
