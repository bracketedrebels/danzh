import { noop } from "ramda-adjunct"
import { ReactNode } from "react"
import { CSSTransition } from "react-transition-group"

export default ({ active = false, onTransitionEnd = noop, children = null as ReactNode }) => (
  <div className="relative">
    <CSSTransition
      in={active}
      addEndListener={onTransitionEnd}
      classNames={{
        enter: "bg-opacity-20 translate-x-0 bg-error transform transition",
        exit: "bg-opacity-0 translate-x-2 bg-error transform transition",
        appear: "bg-opacity-20 translate-x-0 bg-error transform transition",
      }}
      mountOnEnter={true}
      unmountOnExit={true}
    >
      {() => <div className="absolute pointer-events-none inset-0 clip-arrow-left" />}
    </CSSTransition>
    <CSSTransition
      in={active}
      addEndListener={onTransitionEnd}
      classNames={{
        enter: "bg-opacity-20 translate-x-0 bg-error transform transition",
        exit: "bg-opacity-0 -translate-x-2 bg-error transform transition",
        appear: "bg-opacity-20 translate-x-0 bg-error transform transition",
      }}
      mountOnEnter={true}
      unmountOnExit={true}
    >
      {() => <div className="absolute pointer-events-none inset-0 clip-arrow-right" />}
    </CSSTransition>
    {children}
  </div>
)
