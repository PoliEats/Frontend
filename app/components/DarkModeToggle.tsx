import { useEffect, useState } from 'react'
import { Moon, Sun } from 'react-feather'

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleClick = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setIsDarkMode(newTheme === 'dark')
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)

    console.log("currentTheme", currentTheme)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme)
      setIsDarkMode(savedTheme === 'dark')
    } else {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
      if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark')
        setIsDarkMode(true)
      } else {
        document.documentElement.setAttribute('data-theme', 'light')
        setIsDarkMode(false)
      }
    }
  }, [])

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center text-text-50"
    >
      {isDarkMode ? (
        <Moon
          size={24}
          className="hidden md:block cursor-pointer hover:text-accent-500 transition-colors duration-300"
        />
      ) : (
        <Sun
          size={24}
          className="hidden md:block cursor-pointer hover:text-accent-500 transition-colors duration-300"
        />
      )}
    </button>
  )
}

export default DarkModeToggle
