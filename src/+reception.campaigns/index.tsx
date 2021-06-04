export default () => (
  <div className="backdrop-blur h-full bg-surface bg-opacity-50 flex flex-col justify-center items-stretch gap-4">
    <div className="bg-surface-dark bg-opacity-50 grid grid-cols-3 grid-rows-3 gap-4 p-6">
      <button className="clip-d20-h text-base py-3 px-4 w-full row-start-1 col-start-1 row-span-2 col-span-1 self-center">
        Manage
      </button>
      <div className="p-4 bg-primary clip-d20-keep-proportions-v row-start-1 col-start-2 row-span-2 col-span-1 self-center">
        <img
          src="https://png.pngtree.com/template/20190119/ourmid/pngtree-abstract-logo-image_52740.jpg"
          className="clip-d20-keep-proportions-v w-28"
        />
      </div>
      <button className="clip-d20-h text-base py-3 px-4 w-full row-start-1 col-start-3 row-span-2 col-span-1 self-center">
        Play
      </button>
      <div className="row-start-3 col-start-1 row-span-1 col-span-3 flex flex-col items-center justify-start">
        <h4 className="text-base font-sans font-bold">The Mighty Nein</h4>
        <p className="text-base font-sans">Role: Dungeon Master</p>
        <p className="text-base font-sans">Last played: 03/17/1990</p>
      </div>
    </div>
  </div>
)
