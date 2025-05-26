import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { type ReactNode, useEffect, useState } from 'react'
import { Loader } from 'react-feather'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ChatBubbleProps {
  // Define any props you want to pass to the ChatBubble component
  index: number
  message: string
  sender: 'user' | 'bot'
  timestamp: string
  children?: ReactNode
  loading?: boolean
}

function ChatBubble({
  index,
  message,
  sender,
  timestamp,
  children,
  loading = false,
}: ChatBubbleProps) {
  const [hasEnded, setEnded] = useState(false)
  const count = useMotionValue(0)
  const roundedCount = useTransform(count, (latest) => Math.round(latest))
  const displayText = useTransform(roundedCount, (latest) =>
    message.slice(0, latest)
  )

  useEffect(() => {
    const controls = animate(count, message.length, {
      type: 'tween',
      duration: 2.5,
      ease: 'easeInOut',
      onComplete() {
        setEnded(true)
      },
    })
    return controls.stop
  }, [])

  return !loading ? (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 10,
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
      className={`flex ${
        sender === 'user' ? 'justify-end md:mr-4' : 'justify-start md:ml-4'
      } mb-4`}
    >
      <div
        className={`max-w-sm p-3 px-4 md:px-8 gap-y-2 flex flex-col rounded-lg text-sm md:text-base ${
          sender === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'
        } shadow-md ${
          sender === 'user'
            ? 'bg-primary-500 text-white'
            : 'bg-background-950 text-text-200'
        }`}
      >
        <div className={`flex flex-row gap-x-2`}>
          <img
            src={
              sender === 'user'
                ? 'https://api.dicebear.com/9.x/thumbs/svg?flip=false'
                : 'https://api.dicebear.com/9.x/bottts/svg?seed=PoliEats&backgroundColor=c0aede'
            }
            alt="User"
            className="w-4 h-4 rounded-full"
          />
          <small
            className={`text-xs ${
              sender === 'user' ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            {sender === 'user' ? 'Você' : 'PoliEats'}
          </small>
        </div>
        <motion.p>
          {sender === 'bot' ? (
            hasEnded ? (
              <Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
            ) : (
              displayText
            )
          ) : (
            message
          )}
        </motion.p>
        {children}
        <span
          className={`text-xs ${
            sender === 'user' ? 'text-gray-300' : 'text-gray-500'
          }`}
        >
          {timestamp}
        </span>
      </div>
    </motion.div>
  ) : (
    <div
      className={`flex ${
        sender === 'user' ? 'justify-end mr-4' : 'justify-start ml-4'
      } mb-4`}
    >
      <Loader size={16} className="text-white animate-spin" />
    </div>
  )
}

interface Option {
  label: string
  onClick: () => void
}

interface ChatBubbleOptions {
  options?: Option[]
  onSelect?: (option: string) => void
}

function ChatBubbleOptions({ options }: ChatBubbleOptions) {
  return (
    <div className="flex flex-col gap-y-2 mt-2">
      {options?.map((option: Option, index: number) => (
        <button
          key={index}
          className="text-[#6dc0c9] text-sm bg-background-800/20 rounded-sm text-center px-4 py-2 hover:text-accent-500 transition-all duration-300 cursor-pointer"
          onClick={() => {
            option.onClick()
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export { ChatBubble, ChatBubbleOptions }

