import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/home/Home';
import AuthForm from './components/Auth/AuthForm';
import { AppContextProvider } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import { PrivateRoute, PublicRoute } from './components/ProtectedRoute';
import EmailVerify from "./components/EmailVerify";

const App = () => {
  return (
    <AppContextProvider>
      <ToastContainer />

      <Router>
        <Routes>
          {/* Home page, protected by PrivateRoute */}
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />

          {/* Email verification page */}
          <Route 
            path="/email-verify" 
            element={
              <PrivateRoute>
                <EmailVerify />
              </PrivateRoute>
            } 
          />

          {/* Auth page, protected by PublicRoute */}
          <Route 
            path="/auth" 
            element={
              <PublicRoute>
                <AuthForm />
              </PublicRoute>
            } 
          />
        </Routes>
      </Router>
    
    </AppContextProvider>
  );
};

export default App;
