import Container from '@mui/material/Container'
import '../../Styles/Login.css'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const postLogin = async () => {
    try {

      const res = await axios.post(
        "http://localhost:5001/api/authentication/login",
        {
          email,
          password
        } , {withCredentials: true}
      )
      toast.success('Login successfully!')
      console.log(res.data)

      navigate("/dashboard")

    } catch (error) {
  if (error.response?.status === 429) {
    toast.error("Too many login attempts. Please try again later.");
  } else {
    toast.error(
      error.response?.data?.message || "Invalid email or password."
    );
  }
}
}

  return (
    <Container
      maxWidth={false}
      className="login-page"
    >

      <div className="Card-Login">

        {/* Back */}
        <button
          className="backBtn"
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>


        {/* Header */}
        <div className="login-header">

          <h1>Welcome Back</h1>

          <p>Login to continue</p>

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


          <button
            onClick={postLogin}
            className="CreateBtn"
            disabled={!email || !password}
          >
            Login
          </button>
         
        </div>


        {/* Signup */}
        <div className="signup-text">

          <p>Don't have an account?</p>

          <Link
            to="/Signup"
            className="login-link"
          >
            Sign Up
          </Link>

        </div>

      </div>

    </Container>
  )
}