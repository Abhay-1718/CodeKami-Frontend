import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import Home from "./components/home/Home";
import AuthForm from "./components/Auth/AuthForm";
import { AppContext, AppContextProvider } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import EmailVerify from "./components/EmailVerify";


const AuthWrapper = ({ children }) => {
  const { isLoggedin, isLoading } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    const publicRoutes = ['/auth'];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (isLoggedin && isPublicRoute) {
      navigate('/', { replace: true });
    } else if (!isLoggedin && !isPublicRoute) {
      navigate('/auth', { replace: true });
    }
  }, [isLoggedin, location.pathname, navigate, isLoading]);

  if (isLoading) {
    return <div
    className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
    role="status">
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
  </div>

  }

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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthWrapper>
      </Router>
    </AppContextProvider>
  );
};

export default App;
