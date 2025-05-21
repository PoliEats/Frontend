import { Link } from 'react-router'
import DarkModeToggle from './DarkModeToggle'

function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-background-950 p-2 px-4 rounded-lg shadow-md">
                <div className="flex items-center gap-x-6">
                    <img src="/icon.png" alt="Logo" className="h-14 w-14" />
                    <ul className="flex items-center gap-x-6">
                        <li>
                            <Link to="/dashboard" className="text-text-200 text-sm hover:text-text-100 transition-colors duration-300">
                                Início
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/menu" className="text-text-200 text-sm hover:text-text-100 transition-colors duration-300">
                                Cardápio
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/kitchen" className="text-text-200 text-sm hover:text-text-100 transition-colors duration-300">
                                Cozinha
                            </Link>
                        </li>
                    </ul>
                </div>
                <DarkModeToggle />
            </nav>
  )
}

export default Navbar