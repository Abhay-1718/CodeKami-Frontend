// AppContext.jsx
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
  isLoading: true,
});

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const backendUrl = VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      
      if (data.success) {
        setUserData(data.userData);
      } else {
        setUserData(null);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to get user data:", error);
      setUserData(null);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const getAuthState = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
    isLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
