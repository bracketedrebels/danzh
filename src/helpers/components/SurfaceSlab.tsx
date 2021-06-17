import { ReactNode } from "react"

export default ({ children = null as ReactNode }) => (
  <div
    className="
      bg-white bg-opacity-30 h-full filter shadow-2xl relative
      after:border-white after:border-l after:border-r after:border-opacity-90 after:pointer-events-none after:absolute after:inset-0 after:empty-content
      before:bg-gradient-to-b before:from-white before:to-gray-200 before:opacity-70 before:empty-content before:absolute before:inset-0 before:pointer-events-none
      flex flex-col items-center justify-center max-w-min"
  >
    {children}
  </div>
)
