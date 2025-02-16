import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { IoSparklesOutline } from "react-icons/io5"

const Navbar = () => {
  const navigate = useNavigate()
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext)

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + "/api/auth/logout")

      if (data.success) {
        setIsLoggedin(false)
        setUserData(null)
        navigate("/auth")
      }
    } catch (error) {
      toast.error(error.message)
      setIsLoggedin(false)
      setUserData(null)
      navigate("/auth")
    }
  }

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp")

      if (data.success) {
        navigate("/email-verify")
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getInitial = () => {
    if (!userData || !userData.name) return "?"
    return userData.name[0].toUpperCase()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold text-gray-800 dark:text-white transition-all duration-300 hover:text-gray-600 dark:hover:text-gray-300">
              Codekami
            </span>
            <IoSparklesOutline className="w-5 h-5 text-blue-500 animate-pulse" />
          </div>

          {/* User Menu */}
          {userData && (
            <div className="relative group">
              <button className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white font-medium transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {getInitial()}
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform scale-95 group-hover:scale-100">
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden bg-white dark:bg-gray-800">
                  <div className="py-1">
                    {userData && !userData.isAccountVerified && (
                      <button
                        onClick={sendVerificationOtp}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        Send Verification OTP
                      </button>
                    )}
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
