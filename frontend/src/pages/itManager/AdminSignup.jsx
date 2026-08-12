import Container from '@mui/material/Container'
import '../../Styles/AdminSignup.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
export default function AdminSignup() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [organization, setOrganization] = useState('')
  const [ITWorkspace, setITWorkspace] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (password !== confirmPassword) {
        console.log('Passwords do not match')
        return
      }
      const res = await axios.post('http://localhost:5001/api/admin/signup', {
        userName,
        email,
        password,
        organization,
        ITWorkspace,
      })

      console.log(res.data)
      setUserName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setOrganization('')
      setITWorkspace('')
      navigate('/itLogin')
    } catch (error) {
      console.log(error.response?.data || error)
    }
  }

  return (
    <Container maxWidth={false} className="admin-page">
      <section className="admin-card">
        <button className="back-btn" onClick={() => navigate('/getStarted')}>
          ← Back
        </button>

        <div className="admin-header">
          <h1>Create IT Workspace</h1>
          <p>Set up your workspace and administrator account.</p>
        </div>

        <div className="admin-form">
          <div className="form-group">
            <label>Administrator Name</label>
            <input
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value)
              }}
              type="text"
              placeholder="John Smith"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              type="email"
              placeholder="admin@company.com"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              type="password"
              placeholder="Create a strong password"
            />
          </div>

          <div className="form-group">
            <label>Organization Name</label>
            <input
              value={organization}
              onChange={(e) => {
                setOrganization(e.target.value)
              }}
              type="text"
              placeholder="Acme Technologies"
            />
          </div>

          <div className="form-group">
            <label>IT Workspace Name</label>
            <input
              value={ITWorkspace}
              onChange={(e) => {
                setITWorkspace(e.target.value)
              }}
              type="text"
              placeholder="Technical Support"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
              type="password"
              placeholder="Confirm your password"
            />
          </div>

          <button
            disabled={
              !userName ||
              !email ||
              !password ||
              !confirmPassword ||
              !organization ||
              !ITWorkspace
            }
            type="submit"
            onClick={handleSubmit}
            className="create-btn"
          >
            Create IT Workspace →
          </button>
        </div>

        <div className="login-text">
          <p>Already have an account?</p>
          <Link to="/itLogin">Sign In</Link>
        </div>
      </section>
    </Container>
  )
}
