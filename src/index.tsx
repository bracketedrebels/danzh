import * as ReactDOM from "react-dom"
import App from "./App"
import type { FileEnvironmentDescriptor } from "../.webpack/helpers"

ReactDOM.render(<App className="fixed inset-0 flex" />, document.getElementById("app"))

declare global {
  namespace NodeJS {
    interface ProcessEnv extends FileEnvironmentDescriptor {}
  }
}
