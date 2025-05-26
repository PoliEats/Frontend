import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useEffect, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

interface DropdownMenuContextType {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | any>({});

function DropdownMenuProvider({children}: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [setIsOpen]);
    
    return (
        <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
            <div ref={ref}>
                {children}
            </div>
        </DropdownMenuContext.Provider>
    );
}

function DropdownMenuTrigger({ children, className }: { children: ReactNode, className?: string }) {
    const { setIsOpen, isOpen } = useContext(DropdownMenuContext);

    function handleClick() {
        setIsOpen(!isOpen);
    }

    return (
        <div onClick={handleClick} className="cursor-pointer text-accent-50 hover:text-accent-500 transition-colors duration-200">
            {children}
        </div>
    );
}

function DropdownMenuContent({ children, className }: { children: ReactNode, className?: string }) {
    const { isOpen } = useContext(DropdownMenuContext);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.15, ease: "easeInOut", type: "tween" }}
                    className="absolute mt-2 w-64 md:w-48 shadow-xl/75 shadow-text-950 border border-text-500 -translate-x-[78%] bg-background-950 p-2 rounded-md flex-col flex"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function DropdownMenuItem({ children, className, onClick }: { children: ReactNode, className?: string, onClick?: () => void }) {
    return (
        <div
            onClick={onClick}
            className={`p-2 hover:bg-background-700 rounded-md cursor-pointer ${className}`}
        >
            {children}
        </div>
    );
}

function DropdownMenuSeparator({ className }: { className?: string }) {
    return (
        <div className={`h-[1px] bg-background-700 my-2 ${className}`} />
    );
}

export {
    DropdownMenuContent, DropdownMenuContext, DropdownMenuItem, DropdownMenuProvider, DropdownMenuSeparator, DropdownMenuTrigger
};

