// import Logo from '../../assets/logo.png'
import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

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

  // Get the first letter of the name safely
  const getInitial = () => {
    if (!userData || !userData.name) return "?"
    return userData.name[0].toUpperCase()
  }

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 fixed top-0 left-0 right-0 bg-white dark:bg-black bg-opacity-80 backdrop-blur-lg dark:bg-opacity-80 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center">
  <span className="text-xl font-bold text-black dark:text-white">
    {/* <img src={Logo} alt="Logo" className='w-24 h-auto' /> */}
Codekami
  </span>
</div>


      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black dark:bg-white text-white dark:text-black relative group">
          <span>{getInitial()}</span>
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black dark:text-white rounded pt-10">
            <ul className="list-none m-0 p-2 bg-white dark:bg-black text-sm shadow-lg rounded-lg border border-gray-200 dark:border-gray-800">
              {userData && !userData.isAccountVerified && (
                <li
                  className="py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer rounded"
                  onClick={sendVerificationOtp}
                >
                  Send Verification OTP
                </li>
              )}
              <li
                onClick={logout}
                className="py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer rounded"
              >
                Logout
              </li>
              {/* <li
              onClick={navigate("/reset-password")}
              > Reset Password</li> */}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Navbar

