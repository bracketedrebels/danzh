import * as ReactDOM from "react-dom"
import App from "./App"

ReactDOM.render(<App className="fixed inset-0 flex" />, document.getElementById("app"))

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string
      GITHUB_API_URL: string
      DEPLOY_BASENAME: string
      DEPLOY_OUTPUT: string
    }
  }
}
