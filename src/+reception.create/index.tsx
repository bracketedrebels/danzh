import Localized from "../helpers/Localized"

export default () => (
  <div className="h-full bg-surface bg-opacity-50 flex flex-col justify-start items-stretch gap-4 relative">
    <div className="py-2 bg-surface-light bg-opacity-50 px-16 backdrop-blur flex-grow-0">
      <span className="font-standout text-2xl">
        <Localized>Create campaign</Localized>
      </span>
      <span className="font-sans text-sm block text-primary-light">
        <Localized>Step 1: The way you call it</Localized>
      </span>
    </div>
    <div className="py-32 bg-surface-light bg-opacity-40 backdrop-blur flex flex-col justify-center items-center gap-6 px-16 my-auto">
      <p className="text-primary-light text-sm font-sans p-4">
        <Localized>
          You probably going to reference to this campign somehow. So it has to have a name for it.
          Do not worry, you could change it later for more appropriate one, once you figure it out.
        </Localized>
      </p>
      <input
        autoFocus={true}
        className="bg-transparent border-0 border-b-2 border-primary py-2 text-center font-standout text-lg"
        type="text"
      />
      <button className="clip-d20-h text-base py-4 px-16 whitespace-nowrap bg-gradient-to-r from-primary-dark via-transparent to-primary-dark">
        <Localized>Next step</Localized>
      </button>
    </div>
  </div>
)
