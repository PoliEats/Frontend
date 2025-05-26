import axios from 'axios'
import { LogOut } from 'react-feather'
import { useNavigate } from 'react-router'

function LogoutButton() {
    const navigate = useNavigate()

    async function handleLogout() {
        await axios.post('http://localhost:8000/auth/logout', {}, {
            withCredentials: true,
        }).then((response) => {
            console.log('Logout successful:', response.data)
            navigate('/auth/login')
        }).catch((error) => {
            console.error('Error during logout:', error)
        })
    }

  return (
    <button onClick={handleLogout}>
        <LogOut
            className="text-text-200 hover:text-text-100 transition-colors duration-300 cursor-pointer"
            size={24}
        />
    </button>
  )
}

export default LogoutButton