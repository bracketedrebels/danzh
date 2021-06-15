import { Transition } from "@headlessui/react"
import { inc, pipe, tap, thunkify } from "ramda"
import { isUndefined, stubNull } from "ramda-adjunct"
import { useCallback, useEffect, useMemo, useState } from "react"
import ButtonErrorIndicator from "../helpers/ButtonErrorIndicator"
import defaultPrevented from "../helpers/defaultPrevented"
import Localized from "../helpers/Localized"
import useNativeInputState from "../helpers/useNativeInputState"

export default () => {
  const [name, setName] = useNativeInputState("")

  const [valid, setValid] = useState(!!name)
  const [step, setStep] = useState(0)
  const [lastStep, setLastStep] = useState<number>()

  const nextStep = useCallback(
    defaultPrevented(thunkify(setStep)(pipe(tap(setLastStep as any), inc))),
    [setStep]
  )
  const continueComponent = useMemo(() => stepMap[step].continue, [step])
  const errorComponent = useMemo(() => stepMap[step].error, [step])

  const movingForward = useMemo(() => isUndefined(lastStep) || lastStep < step, [lastStep, step])

  useEffect(() => setValid(!!name), [name])

  return (
    <div className="h-full bg-surface bg-opacity-50 flex flex-col justify-start items-stretch relative w-vp-1/2">
      <div className="py-4 bg-surface-light bg-opacity-50 px-16 backdrop-blur flex-grow-0 flex-col gap-4 items-center">
        <span className="font-standout text-2xl">
          <Localized>Create campaign</Localized>
        </span>
      </div>
      <Transition
        as="div"
        className="bg-surface-light bg-opacity-40 backdrop-blur my-0 py-4 px-16 text-center flex flex-row flex-nowrap justify-center items-center transform transition mt-2"
        show={step > 0}
        enterFrom="opacity-0 translate-y-8"
        enterTo="opacity-100 translate-y-0"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-8"
        appear={false}
      >
        <span className="text-primary-light font-sans text-sm pr-4 whitespace-nowrap">
          Campaign name:
        </span>
        <span className="text-primary font-standout text-base font-bold whitespace-nowrap">
          {name}
        </span>
      </Transition>
      <div className="relative my-auto overflow-visible h-0">
        <Transition
          as="form"
          appear={true}
          onSubmit={nextStep}
          className="absolute inset-x-0 transition transform"
          show={step === 0}
          enterFrom={movingForward ? "opacity-0 translate-y-8" : "opacity-0 -translate-y-8"}
          enterTo="opacity-100 translate-y-0"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo={movingForward ? "opacity-0 -translate-y-8" : "opacity-0 translate-y-8"}
        >
          <div className="transform -translate-y-1/2 bg-surface-light bg-opacity-40 backdrop-blur flex flex-col justify-center items-center gap-6 py-16">
            <p className="text-primary text-sm font-sans py-4 px-16 overflow-hidden text-justify max-w-prose">
              <Localized>
                You probably going to reference to this campign somehow. So you have to have a name
                for it. Do not worry, you could change it later for more appropriate one, once you
                figure it out.
              </Localized>
            </p>
            <input
              autoFocus={true}
              className="bg-transparent border-0 border-b-2 border-primary py-2 px-0 mx-0 text-center font-standout text-lg"
              type="text"
              placeholder="Enter name here"
              value={name}
              onChange={setName}
            />
            <div className={`px-16 w-full bg-opacity-10 ${valid ? "bg-primary" : "bg-error"}`}>
              <ButtonErrorIndicator active={!valid}>
                <button
                  tabIndex={!!name ? 1 : -1}
                  disabled={!name}
                  type="submit"
                  className="
                  disabled:bg-primary-light disabled:bg-opacity-50 disabled:pointer-events-none disabled:from-transparent disabled:to-transparent disabled:text-primary
                  bg-primary bg-opacity-70 clip-d20-h text-base py-3 px-16 whitespace-nowrap  w-full "
                  onClick={nextStep}
                >
                  {valid ? continueComponent : errorComponent}
                </button>
              </ButtonErrorIndicator>
            </div>
          </div>
        </Transition>
        <Transition
          as="form"
          appear={true}
          onSubmit={nextStep}
          className="transition transform"
          show={step === 1}
          enterFrom={`absolute inset-x-0 ${
            movingForward ? "opacity-0 translate-y-8" : "opacity-0 -translate-y-8"
          }`}
          enterTo="opacity-100 translate-y-0 relative w-full"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo={movingForward ? "opacity-0 -translate-y-8" : "opacity-0 translate-y-8"}
        >
          <div className="transform -translate-y-1/2 bg-surface-light absolute bg-opacity-40 backdrop-blur flex flex-col justify-center items-center gap-6 my-auto py-16">
            <p className="text-primary text-sm font-sans py-4 px-16 overflow-hidden text-justify max-w-prose">
              <Localized>
                It is great for you campaign to have a logo. To have a brand, visual recognition.
                Later you will be able to randomize it or upload your own. For now - here is the
                logo for you.
              </Localized>
            </p>
            <div className="flex items-center justify-center">
              <div className="clip-d20-keep-proportions-v w-36 h-36 p-2 bg-primary-light flex-grow-0 flex-shrink-0">
                <div className="clip-d20-keep-proportions-v w-full h-full bg-surface">
                  <img
                    src={`http://tinygraphs.com/isogrids/${encodeURIComponent(
                      name
                    )}?theme=bythepool&numcolors=3&size=260&fmt=svg"`}
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>
            <div className="px-16 w-full bg-opacity-10 bg-primary">
              <button
                type="submit"
                className="
                  disabled:bg-primary-light disabled:bg-opacity-50 disabled:pointer-events-none disabled:from-transparent disabled:to-transparent disabled:text-primary
                  bg-primary bg-opacity-70 clip-d20-h text-base py-3 px-16 whitespace-nowrap text-primary-contrast w-full"
                onClick={nextStep}
                autoFocus
              >
                <Localized>Skip grief and accept</Localized>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}

const stepMap = [
  {
    continue: <Localized>Continue with this name</Localized>,
    error: <Localized>Name needed</Localized>,
  },
  {
    continue: <Localized>Continue with this logo</Localized>,
    error: stubNull,
  },
]
