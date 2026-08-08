import Container from '@mui/material/Container'
import '../Styles/Login.css'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import { useState } from 'react'
import axios from 'axios'
export default function Login(){
    const navigate = useNavigate()
    const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
    const postLogin = async () => {
        try{
            const res  = await axios.post("http://localhost:5001/api/authentication/login" , {email, password})
            setEmail(res.data);
            setPassword(res.data);
            navigate("/dashboard")
        }catch(error){
            console.log(error)
        }
    }
    return(
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
        <div className="Card-Login">
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
          <div style={{marginTop: "40px" , display: "flex" , flexDirection: "column" , gap: "10px"}}>
            <h1>Welcome Back</h1>
            <p style={{color: "#7b7a7a"}}>Login to continue</p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginTop: '30px',
            }}
          >
            <div className='inputs'>
              
              <input value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter your email..." />
            </div>
            <div className='inputs'>
              
              <input value={password} onChange={(e) => {setPassword(e.target.value)}}  placeholder="Enter your password..." type='password' />
            </div>
            
            <div>
            <button onClick={postLogin}  className='CreateBtn'>Login</button>
          </div>
        
          <div style={{display: "flex" , justifyContent: "center" , gap: "5px"}}>
            <p>Don't have an account?</p>
            <div><Link to="/Signup" className='login-link'> Sign up</Link></div>
          </div>
          </div>
        </div>
      </Container>
        </>
    )
}