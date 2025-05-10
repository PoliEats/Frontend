import React from 'react'
import { Outlet } from 'react-router'
import ThemeToggle from 'components/ThemeToggle'

function AuthLayout() {
  return (
    <div>
      <div className='w-full h-16 bg-[var(--navbar)]'>
        <div className="pl-2 pt-2">
          <img src="/logo.svg "className="w-13 h-13" />
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default AuthLayout

