import React, { lazy, Suspense, useEffect, useMemo } from "react"
import { Redirect, Route, Switch, useHistory } from "react-router"
import { BrowserRouter } from "react-router-dom"
import LocalStorageProvider from "./helpers/storage/LocalStorageProvider"

const Reception = lazy(() => import("./+reception"))
const ReceptionCampaigns = lazy(() => import("./+reception.campaigns"))
const ReceptionCreate = lazy(() => import("./+reception.create"))
const Welcome = lazy(() => import("./+welcome"))
const OAuthDiscord = lazy(() => import("./+oauth.discord"))

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
          <div className="text-center flex flex-col items-center flex-grow h-full px-5">
            <div
              className="
              bg-white h-full shadow-lg relative
              before:border-surface-light before:border-y-0 before:border before:border-opacity-30 before:pointer-events-none before:absolute before:inset-0 before:empty-content
              flex flex-col items-center justify-center max-w-min"
            >
              <BrowserRouter basename={process.env.ROUTING_BASENAME}>
                <Suspense fallback={<div className="m-auto">Loading</div>}>
                  <Switch>
                    <Route exact path="/reception" component={Reception} />
                    <Route exact path="/reception/campaigns" component={ReceptionCampaigns} />
                    <Route exact path="/reception/create" component={ReceptionCreate} />
                    <Route exact path="/welcome" component={Welcome} />
                    <Route exact path="/oauth/discord" component={OAuthDiscord} />
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
