import React, { Suspense, lazy } from "react"
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom"
// routing components...
const Welcome = lazy(() => import("./+welcome"))
const Player = lazy(() => import("./+player"))
const Master = lazy(() => import("./+master"))
const OauthSuccessGithub = lazy(() => import("./+oauth.github"))
// ...routing components

export default (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => (
  <div {...props}>
    <div className="absolute inset-0 flex items-stretch justify-stretch bg-black bg-opacity-5 transition-all duration-200">
      <BrowserRouter basename={process.env.ROUTING_BASENAME}>
        <Suspense fallback={<div className="m-auto">Loading</div>}>
          <Switch>
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/oauth/github" component={OauthSuccessGithub} />
            <Redirect to="/welcome" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  </div>
)
