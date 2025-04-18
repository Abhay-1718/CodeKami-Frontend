import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


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
  const backendUrl = import.meta.env.VITE_SERVER_URL || "https://code-kami-backend.vercel.app";
  
  
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  
  

  const getUserData = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserData(data.userData);
        return true;
      }
      return false;
    } catch (error) {

      return false;
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const getAuthState = async () => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        setIsLoggedin(false);
        setUserData(null);
        return;
      }
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch (error) {
      console.log("Auth State Error:", error); // Debugging log
      toast.error("Authentication failed");
      setIsLoggedin(false);
      setUserData(null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
        getAuthState,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
