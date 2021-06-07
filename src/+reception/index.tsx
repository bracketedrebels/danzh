import { useCallback } from "react"
import { useHistory } from "react-router"
import SeparatorBlock from "../helpers/SeparatorBlock"

export default () => {
  const { push } = useHistory()
  const gotoCampaigns = useCallback(() => push("/reception/campaigns"), [push])
  const gotoCreate = useCallback(() => push("/reception/create"), [push])

  return (
    <div className=" h-full bg-surface bg-opacity-60 flex flex-col justify-start items-stretch gap-3">
      <div className="py-2 bg-surface-light bg-opacity-40 backdrop-blur px-16">
        <span className="font-standout text-2xl">DANZH</span>
        <span className="font-sans text-sm block text-primary-light">
          Great day, Sir! Wanna some trpg?
        </span>
      </div>
      <div className="py-32 bg-surface-light bg-opacity-40 backdrop-blur flex flex-col justify-center items-stretch gap-3 px-16 my-auto">
        <button className="clip-d20-h text-base py-4 px-16 whitespace-nowrap bg-gradient-to-r from-primary-dark via-transparent to-primary-dark">
          Profile
        </button>
        <SeparatorBlock />
        <button
          className="clip-d20-h text-base py-4 px-16 whitespace-nowrap bg-gradient-to-r from-primary-dark via-transparent to-primary-dark"
          onClick={gotoCreate}
        >
          Create new campaign
        </button>
        <button
          className="clip-d20-h text-base py-4 px-16 whitespace-nowrap bg-gradient-to-r from-primary-dark via-transparent to-primary-dark"
          onClick={gotoCampaigns}
        >
          Your campaigns
        </button>
        <button className="clip-d20-h text-base py-4 px-16 whitespace-nowrap bg-gradient-to-r from-primary-dark via-transparent to-primary-dark">
          Discover
        </button>
        <SeparatorBlock />
        <button className="clip-d20-h text-base py-4 px-16 whitespace-nowrap bg-gradient-to-r from-primary-dark via-transparent to-primary-dark">
          Continue
        </button>
      </div>
    </div>
  )
}
