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
      <Route path="/auth" element={<AuthForm />} />
      <Route path="/" element={<Home />} />
      <Route path="/email-verify" element={<EmailVerify />} />
      <Route path="*" element={<Navigate to={isLoggedin ? "/" : "/auth"} replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AppContextProvider>
      <ToastContainer />
      <Router>
        <AppRoutes />
      </Router>
    </AppContextProvider>
  );
};

export default App;