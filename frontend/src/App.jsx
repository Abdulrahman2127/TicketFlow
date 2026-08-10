

import { Routes, Route } from 'react-router-dom'
import GetStarted from "./pages/GetStarted.jsx";
import Home from "./pages/Home.jsx"
import SignUp from "./pages/SiginUp.jsx"
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import AdminSignup from "./pages/AdminSignup.jsx"
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getStarted" element={<GetStarted />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminSignup" element={<AdminSignup />} />
      </Routes>

    </div>
  )
}

export default App
