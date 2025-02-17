import { useContext, useEffect, useRef } from "react";
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

const EmailVerify = () => {
  const inputRefs = useRef([]);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate()

  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContext)

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp })

      if (data.success) {
        toast.success(data.message)
        getUserData();
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedin, userData, navigate]) // Added navigate to dependencies

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-white dark:bg-black">
    

      <form className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        onSubmit={onSubmitHandler}
      >
        <h1 className="text-gray-900 dark:text-white text-2xl font-semibold text-center mb-4">
          Email Verify OTP
        </h1>
        <p className="text-center mb-6 text-gray-600 dark:text-gray-400">
          Enter the 6-digit code sent to your email id
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
                ref={e => inputRefs.current[index] = e}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-xl rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 focus:border-transparent"
              />
            ))}
        </div>
        <button className="w-full py-3 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
