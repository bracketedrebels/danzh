import { useEffect, useState } from "react"
import fetch from "../helpers/fetch"

export default () => {
  const [name, setName] = useState(null)

  useEffect(() => {
    let isMounted = true
    fetch(`
        query RepositoryNameQuery {
            repository(owner: "facebook" name: "relay") {
            name
            }
        }
    `)
      .then((response) => {
        if (!isMounted) {
          return
        }
        const data = response.data
        setName(data.repository.name)
      })
      .catch((error) => {
        console.error(error)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div>
      <header>
        <p>{name != null ? `Repository: ${name}` : "Loading"}</p>
      </header>
    </div>
  )
}
