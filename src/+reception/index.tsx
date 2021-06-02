import SeparatorBlock from "../helpers/SeparatorBlock"

export default () => (
  <div className="backdrop-blur h-full px-16 bg-surface bg-opacity-70 flex flex-col justify-center items-stretch gap-4">
    <button className="button-d20 text-base py-4 px-16">Profile</button>
    <SeparatorBlock />
    <button className="button-d20 text-base py-4 px-16 whitespace-nowrap">
      Create new campaign
    </button>
    <button className="button-d20 text-base py-4 px-16">Your campaigns</button>
    <button className="button-d20 text-base py-4 px-16">Discover</button>
    <SeparatorBlock />
    <button className="button-d20 text-base py-4 px-16">Continue</button>
  </div>
)
