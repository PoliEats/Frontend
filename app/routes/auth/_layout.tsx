import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import DarkModeToggle from '~/components/DarkModeToggle'

function AuthLayout() {
  return (
    <main className="w-full h-svh bg-background-950">
      <ToastContainer position='top-right' className="absolute" theme='dark'/>
      <div className="max-w-7xl mx-auto px-4 xl:px-0 h-full flex flex-col py-4 gap-y-4">
        <nav className="w-full h-16 bg-background-950 flex items-center justify-between px-4">
          <div className="pl-2 pt-2">
            <img src="/logo.svg " className="w-13 h-13" />
          </div>
          <DarkModeToggle />
        </nav>
        <Outlet />
      </div>
    </main>
  )
}

export default AuthLayout
