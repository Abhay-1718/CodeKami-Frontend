// components/ProtectedRoute.jsx
import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate,} from 'react-router-dom'; // Import useLocation to get current route
import { AppContext } from '../context/AppContext';
import axios from 'axios';

export const PrivateRoute = ({ children }) => {
  const { isLoggedin, setIsLoggedin, backendUrl } = useContext(AppContext);
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
          withCredentials: true,
        });

        if (!data.success) {
          setIsLoggedin(false); // User is not logged in
          navigate('/auth', { replace: true }); // Redirect to login if not authenticated
        } else {
          setIsLoggedin(true); // User is logged in
        }
      } catch (error) {
        console.log(error);
        setIsLoggedin(false); // User is not authenticated due to error
        navigate('/auth', { replace: true }); // Redirect to login if authentication fails
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth(); // Trigger authentication check on component mount
  }, []); // Run this effect only once, when component mounts

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isLoggedin) {
    return <Navigate to="/auth" replace />; // Redirect to /auth if user is not logged in
  }

  return children;
};

export const PublicRoute = ({ children }) => {
  const { isLoggedin} = useContext(AppContext);
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedin) {
      // If user is logged in, redirect them to the home page
      navigate('/', { replace: true });
      setIsChecking(false); // Skip loading spinner
    } else {
      setIsChecking(false); // User is not logged in, continue with login page
    }
  }, [isLoggedin]); // Watch the isLoggedin state change

  if (isChecking) {
    return <div>Loading...</div>; // Show loading while checking auth
  }

  return children; // Render the children if the user is not logged in
};
