import Container from '@mui/material/Container'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState("");
  const postLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/admin/login', 
        {
        email,
        password,
      } , {
        withCredentials: true
      } )

      console.log(res.data)
      navigate("/itmanagerDashboard");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "note found email!")
    }
  }

  return (
    <Container maxWidth={false} className="login-page">
      <div className="Card-Login">
        {/* Back */}
        <button className="backBtn" onClick={() => navigate('/')}>
          ← Back to Home
        </button>

        {/* Header */}
        <div className="login-header">
          <h1>IT Manager </h1>

          <p>Login in to access the IT Manager dashboard</p>
        </div>

        {/* Form */}
        <div className="login-form">
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
            />
          </div>

          <button onClick={postLogin} className="CreateBtn" disabled={!email || !password}>
            Login
          </button>
          <div style={{position: "absolute" , color: "red" , marginTop: "180px" , marginLeft: "130px"}}>
            {errorMessage && (
            <p style={{color: "red"}}>{errorMessage}</p>
          )}
          </div>
        </div>
        

        {/* Signup */}
        <div className="signup-text">
          <p>Don't have an account?</p>

          <Link to="/adminSignup" className="login-link">
            Sign Up
          </Link>
        </div>
      </div>
    </Container>
  )
}
