function FilterOption({
  title,
  onClick,
  isSelected,
}: {
  title: string
  onClick: () => void
  isSelected?: boolean
}) {
  return (
    <button
      onClick={() => {
        onClick()
      }}
      className={`flex flex-col items-center justify-center gap-y-2 p-2 px-5 min-w-fit w-fit h-fit rounded-lg text-xs md:text-base ${
        isSelected ? 'bg-[#1F8B96]' : 'bg-zinc-900'
      } hover:bg-[#1F8B96] transition-all duration-300 shadow-md cursor-pointer`}
    >
      <p
        className={`text-xs md:text-sm text-white
            }`}
      >
        {title}
      </p>
    </button>
  )
}

export default FilterOption
