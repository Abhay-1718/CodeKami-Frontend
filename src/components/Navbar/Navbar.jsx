import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { IoSparklesOutline } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${backendUrl}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        localStorage.removeItem('token');
        setIsLoggedin(false);
        setUserData(null);
        navigate("/auth");
      }
    } catch (error) {
      toast.error(error.message);
      localStorage.removeItem('token');
      setIsLoggedin(false);
      setUserData(null);
      navigate("/auth");
    }
  };

  const sendVerificationOtp = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getInitial = () => {
    if (!userData || !userData.name) return "?";
    return userData.name[0].toUpperCase();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center group">
            <span className="text-xl font-bold text-white transition-all duration-300 group-hover:tracking-wider">
              Codekami
            </span>
            <IoSparklesOutline className="w-5 h-5 text-white ml-1 animate-pulse" />
          </div>

          {/* User Menu */}
          {userData && (
            <div className="relative group">
              <button className="w-9 h-9 flex justify-center items-center rounded-full bg-white text-black font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] focus:outline-none">
                {getInitial()}
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform scale-95 group-hover:scale-100 z-50">
                <div className="rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.3)] overflow-hidden bg-black border border-gray-800">
                  <div className="py-1">
                    {userData && !userData.isAccountVerified && (
                      <button
                        onClick={sendVerificationOtp}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors duration-150"
                      >
                        Send Verification OTP
                      </button>
                    )}
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors duration-150"
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
      {/* Border separator */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
    </nav>
  );
};

export default Navbar;
