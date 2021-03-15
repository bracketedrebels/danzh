import React, { Suspense, lazy } from "react"
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom"
// routing components...
const Welcome = lazy(() => import("./+welcome"))
const Player = lazy(() => import("./+player"))
const Master = lazy(() => import("./+master"))
// ...routing components

export default (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => (
  <div {...props}>
    <div className="absolute inset-0 flex items-stretch justify-stretch bg-surface transition-all duration-200">
      <div className="absolute inset-0 pointer-events-none neu-convex" />
      <div className="absolute inset-0 bg-repeat-round opacity-25 pointer-events-none" />

      <BrowserRouter basename={process.env.ROUTING_BASENAME}>
        <Suspense fallback={<div className="m-auto text-shadow">Loading</div>}>
          <Switch>
            <Route exact path="/welcome" component={Welcome} />
            <Redirect to="/welcome" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  </div>
)
