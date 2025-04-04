import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import Home from "./components/home/Home";
import AuthForm from "./components/Auth/AuthForm";
import { AppContextProvider, AppContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import EmailVerify from "./components/EmailVerify";

// App wrapper to use context
const AppRoutes = () => {
  const { isLoggedin, getAuthState } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check auth state on app load
  useEffect(() => {
    const checkAuth = async () => {
      await getAuthState();
      
      // Simple routing logic
      const token = localStorage.getItem('token');
      const publicPaths = ['/auth'];
      const currentPath = location.pathname;
      
      if (!token && !publicPaths.includes(currentPath)) {
        // Not logged in and trying to access protected route
        navigate('/auth', { replace: true });
      } else if (token && currentPath === '/auth') {
        // Logged in but on auth page
        navigate('/', { replace: true });
      }
    };
    
    checkAuth();
  }, [getAuthState, navigate, location.pathname]);
  
  return (
    <Routes>
      <Route path="/auth" element={
        isLoggedin ? <Navigate to="/" /> : <AuthForm />
      } />
      <Route path="/" element={
        isLoggedin ? <Home /> : <Navigate to="/auth" />
      } />
      <Route path="/email-verify" element={
        isLoggedin ? <EmailVerify /> : <Navigate to="/auth" />
      } />
      <Route path="*" element={
        isLoggedin ? <Navigate to="/" /> : <Navigate to="/auth" />
      } />
    </Routes>
  );
};

const App = () => {
  return (
    <AppContextProvider>
      {/* Using basename solves the 404 issue on EC2 with Apache/Nginx routing */}
      <Router basename="/">
        <AppRoutes />
        <ToastContainer position="bottom-right" />
      </Router>
    </AppContextProvider>
  );
};

export default App;