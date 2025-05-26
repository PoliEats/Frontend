import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { cn } from "~/functions/functions";

interface ITooltipContext {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TooltipContext = createContext<ITooltipContext | any>({});

function TooltipProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <TooltipContext.Provider value={{
            isOpen,
            setIsOpen
        }}>
            {children}
        </TooltipContext.Provider>
    )
}

function TooltipTrigger({ children, className }: { children: ReactNode, className?: string }) {
    const { setIsOpen } = useContext(TooltipContext);

    function handleMouseEnter() {
        setIsOpen(true);
    }

    function handleMouseLeave() {
        setIsOpen(false);
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={cn("relative group", className)}>
            {children}
        </div >
    )
}

function TooltipContent({ children }: { children: ReactNode }) {
    const { isOpen } = useContext(TooltipContext);

    return (
        <div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -45, x: "-50%", display: "none" }}
                        animate={{ opacity: 1, y: -55, x: "-50%", display: "block" }}
                        exit={{ opacity: 0, y: -40, x: "-50%", display: "none" }}
                        transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
                        className="absolute z-50 bg-background-800 text-text-50 text-sm rounded-lg p-2 shadow-xl"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export { TooltipContent, TooltipProvider, TooltipTrigger };

