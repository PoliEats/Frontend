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
    <div
      className={`flex flex-col gap-y-2 p-2 px-5 rounded-lg text-xs md:text-base bg-background-950 hover:bg-[#1F8B96] hover:text-white text-text-200 transition-all duration-300 cursor-pointer`}
      onClick={onClick}
    >
      <p
        className={`text-xs md:text-sm`}
      >
        {title}
      </p>
    </div>
  );
}

export default QuickMessage;
