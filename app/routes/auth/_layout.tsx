import React from 'react'
import { Outlet } from 'react-router'

function AuthLayout() {
  return (
    <div>
      <div className='w-full h-16 bg-neutral-950'></div>
      <Outlet />
    </div>
  )
}

export default AuthLayout