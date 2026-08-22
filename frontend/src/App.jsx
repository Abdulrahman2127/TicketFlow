import { Routes, Route } from 'react-router-dom'
import GetStarted from './pages/GetStarted.jsx'
import Home from './pages/Home.jsx'
import SignUp from './pages/Employee/SiginUp.jsx'
import EmployeeLogin from './pages/Employee/EmployeeLogin.jsx'
import EmployeeDashboard from './pages/Employee/EmployeeDashboard.jsx'
import AdminSignup from './pages/itManager/AdminSignup.jsx'
import ITManagerDashboard from "./pages/itManager/ITManagerDashboard.jsx"
import Login from "./pages/itManager/Login.jsx"
import { Toaster } from 'react-hot-toast'
import TicketDetails from './pages/itManager/details.jsx'
function App() {
  return (
    <div>
        <Toaster />

      <Routes>
        <Route path="/"element={<Home />} />
        <Route path="/getStarted" element={<GetStarted />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/employeeLogin" element={<EmployeeLogin />} />
        <Route path="/dashboard" element={<EmployeeDashboard />} />
        <Route path="/adminSignup" element={<AdminSignup />} />
        <Route path="/itmanagerDashboard" element={<ITManagerDashboard />} />
        <Route path="/itLogin" element={<Login />} />
        <Route path="/details" element={<TicketDetails />} />

      </Routes>
    </div>
  )
}

export default App
