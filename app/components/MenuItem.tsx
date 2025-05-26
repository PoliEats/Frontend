import { motion } from 'framer-motion'
import { Info } from 'react-feather'
import { TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip'

function MenuItem({
  image,
  name,
  description,
  price,
  category,
  key,
}: {
  image: string
  name: string
  description: string
  price: number
  category: string
  key: number
}) {
  return (
    <motion.section
      key={key}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div className="flex flex-col gap-y-6 items-center h-full w-full bg-background-900 rounded-lg p-4 hover:ring-2 hover:ring-accent-500 transition-all duration-300 cursor-pointer">
        <img
          src={image}
          alt="Menu Item"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg object-cover ring"
        />
        <div className="w-full h-fit">
          <div className='flex gap-x-2 items-center text-text-50'>
            <h4 className="text-base">{name}</h4>
            <TooltipProvider>
              <TooltipTrigger>
                <Info size={14}/>
              </TooltipTrigger>
              <TooltipContent>
                {description}
              </TooltipContent>
            </TooltipProvider>
          </div>
          <p className="text-sm text-gray-500">R$ {price}</p>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default MenuItem
