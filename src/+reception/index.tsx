import { useCallback } from "react"
import { useHistory } from "react-router"
import Button from "../helpers/components/Button"
import SeparatorBlock from "../helpers/components/SeparatorBlock"

export default () => {
  const { push } = useHistory()
  const gotoCampaigns = useCallback(() => push("/reception/campaigns"), [push])
  const gotoCreate = useCallback(() => push("/reception/create"), [push])

  return (
    <div className=" h-full bg-white bg-opacity-30 flex flex-col justify-start items-stretch gap-3">
      <div className="py-2 bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm px-16">
        <span className="font-standout text-2xl text-gray-700">DANZH</span>
        <span className="font-sans text-sm block text-gray-700">
          Great day, Sir! Wanna some trpg?
        </span>
      </div>
      <div className="py-32 backdrop-blur-sm backdrop-filter flex flex-col justify-center items-stretch gap-3 px-16 my-auto">
        <Button>Profile</Button>
        <SeparatorBlock className="text-gray-700" />
        <Button onClick={gotoCreate}>Create new campaign</Button>
        <Button onClick={gotoCampaigns}>Your campaigns</Button>
        <Button>Discover</Button>
        <SeparatorBlock className="text-gray-700" />
        <Button>Continue</Button>
      </div>
    </div>
  )
}
