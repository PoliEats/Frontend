import { LogOut } from 'react-feather'
import { Link, useLocation } from 'react-router'
import { cn } from '~/functions/functions'
import type { Route } from '~/functions/interfaces'
import DarkModeToggle from './DarkModeToggle'

function Navbar() {
  const location = useLocation()

  const routes: Route[] = [
    {
      path: '/dashboard',
      name: 'Início',
    },
    {
      path: '/dashboard/menu',
      name: 'Cardápio',
    },
    {
      path: '/dashboard/kitchen',
      name: 'Cozinha',
    },
  ]

  return (
    <nav className="flex items-center justify-between bg-background-950 p-2 px-4 rounded-lg shadow-md">
      <div className="flex items-center gap-x-6">
        <img src="/icon.png" alt="Logo" className="h-14 w-14" />
        <ul className="flex items-center gap-x-6">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                to={route.path}
                className={cn(
                  'text-text-400 text-sm hover:text-text-100 transition-colors duration-300',
                  {
                    'text-text-100': location.pathname === route.path,
                  }
                )}
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-x-6">
        <DarkModeToggle />
        <LogOut
          className="text-text-200 hover:text-text-100 transition-colors duration-300 cursor-pointer"
          size={24}
          onClick={() => {
            localStorage.removeItem('token')
            window.location.href = '/'
          }}
        />
      </div>
    </nav>
  )
}

export default Navbar
