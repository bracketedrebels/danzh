import { Transition } from "@headlessui/react"
import { noop } from "ramda-adjunct"
import { ReactNode } from "react"

export default ({ active = false, children = null as ReactNode }) => (
  <div className="relative">
    <Transition show={active}>
      <Transition.Child
        as="div"
        className="absolute pointer-events-none inset-0 bg-error clip-arrow-left transition transform ease-in-out duration-200 opacity-20"
        enterFrom="opacity-0 translate-x-2"
        enterTo="opacity-20 translate-x-0"
        leaveFrom="opacity-20 translate-x-0"
        leaveTo="opacity-0 translate-x-2"
      />
      <Transition.Child
        as="div"
        className="absolute pointer-events-none inset-0 bg-error clip-arrow-right transition transform ease-in-out duration-200 opacity-20"
        enterFrom="opacity-0 -translate-x-2"
        enterTo="opacity-20 translate-x-0"
        leaveFrom="opacity-20 translate-x-0"
        leaveTo="opacity-0 -translate-x-2"
      />
    </Transition>
    {children}
  </div>
)
