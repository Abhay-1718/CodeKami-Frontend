import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/home/Home'
import AuthForm from './components/Auth/AuthForm'

const App = () => {
  return (
    <div className='w-full'>
    
    <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<AuthForm />} />
          
        </Routes>
      </Router>

    </div>
  )
}

export default App
