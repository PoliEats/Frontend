import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, type Dispatch, type ReactNode } from "react";
import { cn } from "~/functions/functions";

interface ModalContext {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContext | undefined>(undefined);

function Modal({
  setOpen,
  open,
  children,
}: {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  children: ReactNode;
}) {
  return (
    <ModalContext.Provider value={{ isOpen: open, setIsOpen: setOpen }}>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={(el) => {
              if (el) {
                el.addEventListener("click", (e) => {
                  if (e.target === el) {
                    setOpen(false);
                  }
                });
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

function ModalContent({ children, className }: { children: React.ReactNode, className?: string }) {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("ModalContent must be used within a Modal");
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn("bg-zinc-950 w-md h-1/2 rounded-lg flex flex-col px-4 pb-4", className)}
    >
      {children}
    </motion.div>
  );
}

export { Modal, ModalContent };
