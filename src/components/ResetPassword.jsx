import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"

const ResetPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const inputRefs = useRef([])

  axios.defaults.withCredentials = true

  const { backendUrl } = useContext(AppContext)

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text")
    const pasteArray = paste.split("")
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitEmail = async (e) => {
    e.preventDefault()
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      toast.error("Please enter a valid email address.")
      return
    }

    try {
      setIsLoading(true)
      const { data } = await axios.post(backendUrl + "/api/auth/send-reset-otp", { email })
      data.success ? toast.success(data.message) : toast.error(data.message)
      if (data.success) setIsEmailSent(true)
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmitOTP = async (e) => {
    e.preventDefault()
    const otpArray = inputRefs.current.map((input) => input.value).join("")
    if (otpArray.length === 6) {
      setOtp(otpArray)
      setIsOtpSubmitted(true)
    } else {
      toast.error("Please enter a valid 6-digit OTP.")
    }
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.")
      return
    }

    try {
      setIsLoading(true)
      const { data } = await axios.post(backendUrl + "/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      })
      data.success ? toast.success(data.message) : toast.error(data.message)
      if (data.success) navigate("/login")
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-white dark:bg-black">
      {/* <img
        onClick={() => navigate("/")}
        src={assets.logo || "/placeholder.svg"}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      /> */}

      {/* Enter Email Form */}
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-gray-900 dark:text-white text-2xl font-semibold text-center mb-4">Reset Password</h1>
          <p className="text-center mb-6 text-gray-600 dark:text-gray-400">Enter your registered email address</p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
            {/* <img src={assets.email_icon || "/placeholder.svg"} alt="" className="w-3 h-3" /> */}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="Email Id"
              className="bg-transparent outline-none text-gray-900 dark:text-white w-full"
            />
          </div>
          <button
            disabled={isLoading}
            className="w-full py-3.5 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 rounded-full mt-2 hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300"
          >
            {isLoading ? "Sending..." : "Submit"}
          </button>
        </form>
      )}

      {/* OTP Form */}
      {!isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitOTP} className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-gray-900 dark:text-white text-2xl font-semibold text-center mb-4">Reset Password OTP</h1>
          <p className="text-center mb-6 text-gray-600 dark:text-gray-400">
            Enter 6 digit code sent to your email address
          </p>

          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-xl rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 focus:border-transparent"
                />
              ))}
          </div>
          <button
            disabled={isLoading}
            className="w-full py-2.5 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 rounded-full mt-2 hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300"
          >
            {isLoading ? "Verifying..." : "Submit"}
          </button>
        </form>
      )}

      {/* New Password Form */}
      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-gray-900 dark:text-white text-2xl font-semibold text-center mb-4">New Password</h1>
          <p className="text-center mb-6 text-gray-600 dark:text-gray-400">Enter the new password below</p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
            {/* <img src={assets.lock_icon || "/placeholder.svg"} alt="" className="w-3 h-3" /> */}
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              type="password"
              placeholder="New Password"
              className="bg-transparent outline-none text-gray-900 dark:text-white w-full"
            />
          </div>
          <button
            disabled={isLoading}
            className="w-full py-3.5 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 rounded-full mt-2 hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300"
          >
            {isLoading ? "Updating..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  )
}

export default ResetPassword

