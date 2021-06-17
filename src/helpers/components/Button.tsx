import { DetailedHTMLProps, HTMLAttributes } from "react"

export default ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => (
  <button
    className={`
          clip-d20-h relative text-base font-regular py-4 px-16 whitespace-nowrap
          text-gray-100 bg-gray-700 disabled:bg-gray-400 disabled:text-gray-300
          before:empty-content before:absolute before:inset-0 before:bg-gray-600 before:clip-d20-h
          before:transition-all before:mix-blend-lighten before:opacity-0 hover:before:opacity-100
          active:before:transform active:before:inset-x-4 active:before:transition-none
          hover:before:transition-none before:pointer-events-none ${className || ""}`}
    {...props}
  />
)
