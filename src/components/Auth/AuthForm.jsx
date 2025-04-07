import { useState, useContext, } from 'react';
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { AppContext } from '../../context/AppContext';
import Illustration from '../../assets/Illustration.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthForm = () => {
  const { getAuthState, backendUrl } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeToTerms: false,
    agreeToMarketing: false
  });


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const endpoint = isLogin ? 'login' : 'register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          };

      const { data } = await axios.post(
        `${backendUrl}/api/auth/${endpoint}`,
        payload
      );

      if (data.success) {
        localStorage.setItem('token', data.token);
      
        await getAuthState();
      } else {
        toast.error(data.message || `${isLogin ? 'Login' : 'Registration'} failed`);
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8">
        {/* Left Section */}
        <div className="lg:flex-1 text-white p-4 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Code smarter, not harder</h1>
          <p className="text-lg sm:text-xl text-gray-300">
            Let CodeKami review your code with AI precision!
          </p>

          {/* Illustration */}
          <div className="hidden sm:block mt-8 lg:mt-12">
            <img
              src={Illustration}
              alt="Illustration"
              className="w-full max-w-md mx-auto lg:max-w-none"
            />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="lg:flex-1 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">
            {isLogin ? 'Log in' : 'Sign up now'}
          </h2>

          <form onSubmit={onSubmitHandler} className="space-y-4 sm:space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-2">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-2">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-600 mb-2">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2.5 sm:p-3 border text-black rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                  placeholder={showPassword ? 'Enter your password' : '••••••••'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none group"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <LuEyeClosed size={20} /> : <LuEye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-3 sm:space-y-4">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 mr-2"
                  />
                  <span className="text-xs sm:text-sm text-gray-600">
                    By creating an account, I agree to our{' '}
                    <a href="#" className="text-gray-800 hover:underline">Terms of use</a> and{' '}
                    <a href="#" className="text-gray-800 hover:underline">Privacy Policy</a>
                  </span>
                </label>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToMarketing"
                    checked={formData.agreeToMarketing}
                    onChange={handleInputChange}
                    className="mt-1 mr-2"
                  />
                  <span className="text-xs sm:text-sm text-gray-600">
                    By creating an account, I am also consenting to receive SMS messages and emails,
                    including product new feature updates, events, and marketing promotions.
                  </span>
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gray-300 text-gray-700 py-2.5 sm:py-3 rounded-lg hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              {isLogin ? 'Log in' : 'Sign up'}
            </button>

            <p className="text-center text-sm sm:text-base text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    agreeToTerms: false,
                    agreeToMarketing: false
                  });
                }}
                className="text-gray-800 font-semibold hover:underline focus:outline-none"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
