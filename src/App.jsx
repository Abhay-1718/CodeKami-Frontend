import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import Home from "./components/home/Home";
import AuthForm from "./components/Auth/AuthForm";
import { AppContext, AppContextProvider } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import EmailVerify from "./components/EmailVerify";

// Auth wrapper component to handle protected routes
const AuthWrapper = ({ children }) => {
  const { isLoggedin } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in and tries to access /auth, redirect to home
    if (isLoggedin && location.pathname === '/auth') {
      navigate('/');
    }
    
    // If user is not logged in and tries to access protected routes, redirect to auth
    if (!isLoggedin && (location.pathname === '/' || location.pathname === '/email-verify')) {
      navigate('/auth');
    }
  }, [isLoggedin, location.pathname, navigate]);

  return children;
};

const App = () => {
  return (
    <AppContextProvider>
      <ToastContainer />
      <Router>
        <AuthWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/email-verify" element={<EmailVerify />} />
            <Route path="/auth" element={<AuthForm />} />
            {/* Catch all other routes and redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthWrapper>
      </Router>
    </AppContextProvider>
  );
};

export default App;