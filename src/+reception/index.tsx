import { useCallback } from "react"
import { useHistory } from "react-router"
import SeparatorBlock from "../helpers/SeparatorBlock"

export default () => {
  const { push } = useHistory()
  const gotoCampaigns = useCallback(() => push("/reception/campaigns"), [push])
  const gotoCreate = useCallback(() => push("/reception/create"), [push])

  return (
    <div className="backdrop-blur h-full px-16 bg-surface bg-opacity-50 flex flex-col justify-center items-stretch gap-4">
      <button className="clip-d20-h text-base py-4 px-16 whitespace-nowrap">Profile</button>
      <SeparatorBlock />
      <button className="clip-d20-h text-base py-4 px-16 whitespace-nowrap" onClick={gotoCreate}>
        Create new campaign
      </button>
      <button className="clip-d20-h text-base py-4 px-16 whitespace-nowrap" onClick={gotoCampaigns}>
        Your campaigns
      </button>
      <button className="clip-d20-h text-base py-4 px-16 whitespace-nowrap">Discover</button>
      <SeparatorBlock />
      <button className="clip-d20-h text-base py-4 px-16 whitespace-nowrap">Continue</button>
    </div>
  )
}
