import React, { lazy, Suspense, useEffect, useMemo } from "react"
import { Redirect, Route, Switch, useHistory } from "react-router"
import { BrowserRouter } from "react-router-dom"
import LocalStorageProvider from "./helpers/storage/LocalStorageProvider"

export default (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  const history = useHistory()
  const provider = useMemo(() => localStorage.getItem("oauth.provider"), [])
  const tokenValid = useMemo(() => !!localStorage.getItem(`oauth.token.${provider}`), [provider])

  useEffect(() => void tokenValid && history.replace("/welcome"), [tokenValid])

  return (
    <LocalStorageProvider>
      <div {...props}>
        <div className="h-full w-full withbg">
          <div className="text-center flex flex-col items-center justify-center flex-grow h-full px-5">
            <div
              className="
            bg-surface bg-opacity-60 h-full shadow-lg relative
            before:border-surface-light before:border-y-0 before:border before:border-opacity-30 before:pointer-events-none before:absolute before:inset-0 before:empty-content
            flex flex-col items-center justify-center"
            >
              v
              <BrowserRouter basename={process.env.ROUTING_BASENAME}>
                <Suspense fallback={<div className="m-auto">Loading</div>}>
                  <Switch>
                    <Route exact path="/reception" component={lazy(() => import("./+reception"))} />
                    <Route exact path="/welcome" component={lazy(() => import("./+welcome"))} />
                    <Route
                      exact
                      path="/oauth/discord"
                      component={lazy(() => import("./+oauth.discord"))}
                    />
                    <Redirect to="/welcome" />
                  </Switch>
                </Suspense>
              </BrowserRouter>
            </div>
          </div>
        </div>
      </div>
    </LocalStorageProvider>
  )
}
