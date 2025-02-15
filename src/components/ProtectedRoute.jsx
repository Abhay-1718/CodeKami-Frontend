// components/ProtectedRoute.jsx
import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';


// components/ProtectedRoute.jsx - Add loading state handler
export const PrivateRoute = ({ children }) => {
    const { isLoggedin, backendUrl, setIsLoggedin } = useContext(AppContext);
    const [isChecking, setIsChecking] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
            withCredentials: true
          });
          
          if (!data.success) {
            setIsLoggedin(false);
            navigate('/auth', { replace: true });
          }
        } catch (error) {
          setIsLoggedin(false);
          navigate('/auth', { replace: true });
        } finally {
          setIsChecking(false);
        }
      };
  
      checkAuth();
    }, []);
  
    if (isChecking) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      );
    }
  
    return children;
  };

export const PublicRoute = ({ children }) => {
  const { isLoggedin, backendUrl, setIsLoggedin } = useContext(AppContext);
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
          withCredentials: true
        });
        
        if (data.success) {
          setIsLoggedin(true);
          navigate('/', { replace: true });
        }
      } catch (error) {
        setIsLoggedin(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (isChecking) {
    // You can replace this with a loading spinner component
    return <div>Loading...</div>;
  }

  if (isLoggedin) {
    return <Navigate to="/" replace />;
  }

  return children;
};