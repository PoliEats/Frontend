import { Outlet } from 'react-router'

function AuthLayout() {
  return (
    <div>
      <div className="w-full h-16 bg-[var(--navbar)]">
        <div className="pl-2 pt-2">
          <img src="/logo.svg " className="w-13 h-13" />
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default AuthLayout
