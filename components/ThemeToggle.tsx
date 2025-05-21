import React, { useEffect, useState } from 'react'

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false) //evita flickering no ssr
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'dark') {
      setDarkMode(true)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const html = document.documentElement
    if (darkMode) {
      html.classList.add('dark')
      html.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      html.classList.remove('dark')
      html.classList.add('light')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode, mounted])

  if (!mounted) return null
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="flex flex-col items-center justify-center p-2 cursor-pointer"
      aria-label="Alternar tema"
    >
      {darkMode ? (
        <img src="/sun.svg" alt="Tema Claro" className="w-6 h-6" />
      ) : (
        <img src="/moon.svg" alt="Tema Escuro" className="w-6 h-6" />
      )}
    </button>
  )
}

export default ThemeToggle
