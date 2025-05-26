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
        isSelected ? 'bg-accent-400' : 'bg-background-900'
      } hover:bg-accent-400 transition-all duration-300 cursor-pointer`}
    >
      <p
        className={`text-xs md:text-sm text-text-50`}
      >
        {title}
      </p>
    </button>
  )
}

export default FilterOption
