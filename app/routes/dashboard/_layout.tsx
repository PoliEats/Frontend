import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '~/components/Navbar'

function _layout() {
  return (
    <main className="w-full h-svh bg-background-900">
      <ToastContainer position='top-right' className="absolute" theme='dark'/>
      <div className="max-w-7xl mx-auto px-4 xl:px-0 h-full flex flex-col py-4 gap-y-4">
        <Navbar />
        <Outlet />
      </div>
    </main>
  )
}

export default _layout
