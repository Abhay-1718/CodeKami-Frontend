
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../constants";

export const AppContext = createContext({
  backendUrl: "",
  isLoggedin: false,
  setIsLoggedin: () => {},
  userData: null,
  setUserData: () => {},
  getUserData: () => {},
  getAuthState: () => {},
});

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const backendUrl = VITE_BACKEND_URL || "http://15.206.179.46:5000";
  
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      
      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch (error) {
      console.error("Auth state check failed:", error);
      setIsLoggedin(false);
      setUserData(null);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      
      
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to get user data:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    getAuthState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};