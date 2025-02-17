import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/home/Home';
import AuthForm from './components/Auth/AuthForm';
import { AppContextProvider } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import { PrivateRoute, PublicRoute } from './components/ProtectedRoute';
// import ResetPassword from "./components/ResetPassword";
import EmailVerify from "./components/EmailVerify";

const App = () => {
  return (
    <AppContextProvider>
      <ToastContainer/>

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
    
    </AppContextProvider>
  );
};

export default App;