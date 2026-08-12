import Container from '@mui/material/Container'
import '../../Styles/Register.css'

import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import axios from "axios"
import { useState } from 'react'
export default function SiginUp() {
  const navigate = useNavigate()
  const [userName , setUserName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const postUser = async () => {
    try{
      const res  = await axios.post(`${import.meta.env.VITE_API_URL}/api/authentication/register`, {userName , email , password} );
      console.log(res.data)
      setUserName(res.data)
      setEmail(res.data)
      setPassword(res.data)
      navigate("/login")
    }catch(error){
      console.log(error)
    }
  }

  
  return (
    <>
      <Container
        maxWidth="sm"
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="signup-card">
          <div
            style={{
              position: 'absolute',
              marginTop: '7px',
              marginLeft: '5px',
              
            }}
          >
            <button className='backBtn'
              onClick={() => navigate('/')}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '13px',
                color: "#000000"
              }}
            >
              ← Back to Home
            </button>
          </div>
          <div style={{marginTop: "20px", display: "flex" , flexDirection: "column" , gap: "0xp"}}>
            <h1 style={{marginBottom: "7px"}}>Create Account</h1>
            <p style={{color: "#7b7a7a", marginTop: "0px "}}>Create your account to continue</p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginTop: '0px',
            }}
          >
            <div className='inputs'>
              
              <input value={userName} onChange={(e) => {setUserName(e.target.value)}} placeholder="John Smith" />
            </div>
            <div className='inputs'>
              
              <input value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="name@example.com" />
            </div>
            <div className='inputs'>
              
              <input value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Create a strong password" type='password' />
            </div>
            
          <section>
              <div>
            <button onClick={postUser} disabled={!userName || !email || !password} className='CreateBtn'>Create Account</button>
          </div>
          <div  style={{display: "flex" , justifyContent: "center" , gap: "5px" , alignItems: "center"}}>
            <p>Already have an account?</p>
            <div><Link to="/employeeLogin" className='login-link'>Sign In</Link></div>
          </div>
          </section>
          </div>
        </div>
      </Container>
    </>
  )
}
