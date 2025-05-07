import React from 'react'
import { Outlet } from 'react-router'

function AuthLayout() {
  return (
    <div>
      <div className='w-full h-16 bg-neutral-950'>
        <div className="pl-2 pt-2">
          <div className="w-13 h-13 bg-white rounded-full"></div>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default AuthLayout

