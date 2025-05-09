
function FilterOption({
    title,
    onClick
}: {
    title: string,
    onClick: () => void
}) {
  return (
    <button
    onClick={() => {
        onClick()
    }}
    className={`flex flex-col gap-y-2 p-2 px-5 w-fit rounded-lg text-xs md:text-base bg-zinc-900 hover:bg-[#1F8B96] transition-all duration-300 shadow-md cursor-pointer`}
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