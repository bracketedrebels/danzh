import GithubIcon from "../helpers/icon/github"

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
    <div className="fixed inset-0 flex flex-col items-stretch">
      <div className="bg bg-no-repeat bg-cover bg-center flex flex-col items-center 2xl:items-end 2xl:pr-10 justify-center text-white flex-grow">
        <div className="font-sans text-4xl sm:text-6xl xl:text-8xl 2xl:text-9xl filter-drop-shadow-md">
          DANZH
          <div className="h-1 rounded bg-gradient-to-l bg-white" />
        </div>
        <div className="text-sm sm:text-xl xl:text-3xl text-opacity-75 mt-3">
          Tabletop games state management tool
        </div>
      </div>
      <div className="flex mx-auto 2xl:mr-6 2xl:ml-auto mt-auto mb-6 items-center">
        <span className="text-opacity-80 text-black font-sans mr-3 text-lg">Log in:</span>
        <button className="justify-center p-2 border border-transparent shadow-sm font-sans rounded-full text-white bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <GithubIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  )
}
