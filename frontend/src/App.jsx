

import { Routes, Route } from 'react-router-dom'
import Improved from "./pages/ImprovedResume.jsx";
import Home from "./pages/Home.jsx"
import Preview from "./pages/Preview.jsx"
import SignUp from "./pages/SiginUp.jsx"
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/improved" element={<Improved />} />
        <Route path="/preview/:id" element={<Preview />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </div>
  )
}

export default App
