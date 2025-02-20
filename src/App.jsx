import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import AuthForm from "./components/Auth/AuthForm";
import { AppContextProvider } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import EmailVerify from "./components/EmailVerify";

const App = () => {
  return (
    <AppContextProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/email-verify" element={<EmailVerify />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
};

export default App;