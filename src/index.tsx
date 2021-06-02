import * as ReactDOM from "react-dom"
import type { FileEnvironmentDescriptor } from "../.webpack/helpers"
import App from "./App"

ReactDOM.render(
  <App className="fixed inset-0 flex items-center justify-center" />,
  document.getElementById("app")
)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends FileEnvironmentDescriptor {}
  }
}
