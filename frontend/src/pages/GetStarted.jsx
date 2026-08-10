import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../Styles/GetStarted.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
export default function GetStarted() {
  const navigate = useNavigate()
  return (
    <Container maxWidth="md" className="getstarted-container">
      <button style={{border: "none" , background: "none"}} onClick={() => {navigate("/")}}><ArrowBackIcon
        style={{
          background: 'white',
          color: 'black',
          padding: '10px',
          cursor: 'pointer',
          borderRadius: '25px',
          marginTop: "20px"
        }}
      /></button>
      <section style={{textAlign: "center" , marginTop: "50px" , fontWeight: "bold" , fontSize: "17px"}}>
        <h1>Welcome to TicketFlow</h1>
        <p>Choose your role to get started. Create an IT workspace or join your organization's support team.</p>
      </section>

      <section className="getstarted-cards">
        <div className="card">
          <h3>IT Administrator</h3>
          <p>Create your IT workspace and manage your organization's support requests.</p><br/>
          <Link to="/adminSignup" className='getStarted-btn'>Create IT Workspace →</Link>
        </div>

        <div className="card">
          <h3>Employee</h3>
          <p>Join your IT team, submit support tickets, and track your requests.</p> <br/>
          <Link to="/Signup" className='getStarted-btn' >Join Your Team →</Link>
        </div>
      </section>
    </Container>
  )
}
