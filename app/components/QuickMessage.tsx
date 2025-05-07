
interface QuickMessageProps {
    title: string;
    message: string;
    disabled?: boolean;
    onClick?: () => void;
}

function QuickMessage({
    title,
    message,
    disabled = false,
    onClick = () => {},
    }: QuickMessageProps) {

  return (
    <div className={`flex flex-col gap-y-2 p-2 px-5 rounded-lg text-xs md:text-base bg-zinc-800 hover:bg-[#1F8B96] transition-all duration-300 shadow-md cursor-pointer`} onClick={onClick}>
      <p className={`text-xs md:text-sm ${disabled ? 'text-gray-800' : 'text-white'}`}>{title}</p>
    </div>
  )
}

export default QuickMessage