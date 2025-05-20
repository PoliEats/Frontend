import { useState } from 'react'
import { Moon, Sun } from 'react-feather'

function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    
    const handleClick = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme')
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        setIsDarkMode(newTheme === 'dark')
        document.documentElement.setAttribute('data-theme', newTheme)
    }
  
  return (
    <button onClick={handleClick} className="flex items-center justify-center text-text-50">
        {isDarkMode ? (
            <Moon
                size={24}
                className="hidden md:block cursor-pointer hover:text-[#1F8B96] transition-colors duration-300"
            />
        ) : (
            <Sun
                size={24}
                className="hidden md:block cursor-pointer hover:text-[#1F8B96] transition-colors duration-300"
            />
        )}
    </button>
  )
}

export default DarkModeToggle