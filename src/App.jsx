// App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/home/Home';
import AuthForm from './components/Auth/AuthForm';
import { AppContextProvider } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PrivateRoute, PublicRoute } from './components/ProtectedRoute';
// import ResetPassword from "./components/ResetPassword";
import EmailVerify from "./components/EmailVerify";

const App = () => {
  return (
    <AppContextProvider>
      <ToastContainer/>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Router>
          <Routes>
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } 
            />
           
            <Route 
              path="/email-verify" 
              element={
                <PrivateRoute>
                  <EmailVerify />
                </PrivateRoute>
              } 
            />

            <Route 
              path="/auth" 
              element={
                <PublicRoute>
                  <AuthForm />
                </PublicRoute>
              } 
            />
             {/* <Route 
              path="/reset-password" 
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              } 
            /> */}
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </AppContextProvider>
  );
};

export default App;