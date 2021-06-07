import { stubNull } from "ramda-adjunct"
import { useCallback, useEffect, useMemo, useState } from "react"
import ButtonErrorIndicator from "../helpers/ButtonErrorIndicator"
import Localized from "../helpers/Localized"
import useNativeInputState from "../helpers/useNativeInputState"

export default () => {
  const [name, setName] = useNativeInputState("")
  const [valid, setValid] = useState(!!name)
  const [step, setStep] = useState(0)

  const nextStep = useCallback(
    (e) => {
      e.preventDefault()
      setStep((p) => p + 1)
    },
    [setStep]
  )
  const continueComponent = useMemo(() => stepMap[step].continue, [step])
  const errorComponent = useMemo(() => stepMap[step].error, [step])

  useEffect(() => setValid(!!name), [name])

  return (
    <div className="h-full bg-surface bg-opacity-50 flex flex-col justify-start items-stretch gap-4 relative">
      <div className="py-2 bg-surface-light bg-opacity-50 px-16 backdrop-blur flex-grow-0">
        <span className="font-standout text-2xl">
          <Localized>Create campaign</Localized>
        </span>
        <span className="font-sans text-sm block text-primary-light">
          <Localized>Step 1: The way you call it</Localized>
        </span>
      </div>
      <form
        onSubmit={nextStep}
        className="py-32 bg-surface-light bg-opacity-40 backdrop-blur flex flex-col justify-center items-center gap-6 px-16 my-auto"
      >
        {step > 0 ? (
          <h2 className="bg-transparent py-2 text-center font-standout font-bold text-lg text-primary-dark">
            {name}
          </h2>
        ) : null}
        <p className="text-primary-light text-sm font-sans p-4">
          <Localized>
            You probably going to reference to this campign somehow. So you have to have a name for
            it. Do not worry, you could change it later for more appropriate one, once you figure it
            out.
          </Localized>
        </p>
        {step === 0 ? (
          <input
            autoFocus={true}
            className="bg-transparent border-0 border-b-2 border-primary py-2 text-center font-standout text-lg"
            type="text"
            placeholder="Enter name here"
            value={name}
            onChange={setName}
          />
        ) : null}
        <ButtonErrorIndicator active={!valid}>
          <button
            tabIndex={!!name ? 1 : -1}
            disabled={!name}
            type="submit"
            className="
              disabled:bg-primary-light disabled:bg-opacity-50 disabled:pointer-events-none disabled:from-transparent disabled:to-transparent disabled:py-2 disabled:text-primary
              bg-primary bg-opacity-70 clip-d20-h text-base py-4 px-16 whitespace-nowrap text-primary-contrast"
            onClick={nextStep}
          >
            {valid ? continueComponent : errorComponent}
          </button>
        </ButtonErrorIndicator>
      </form>
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
