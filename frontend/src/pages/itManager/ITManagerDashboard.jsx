import Container from '@mui/material/Container'
import '../../Styles/Dashboard.css'
import { Link } from 'react-router-dom'

export default function ITManagerDashboard() {
  return (
    <Container maxWidth="lg">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome back 👋</h1>
          <p>Here’s an overview of your tickets.</p>
        </div>
        <div style={{display: "flex" , alignItems: "center" , gap: "20px" , marginBottom: "30px"}}>
          <Link>Dashboard</Link>
          <Link>My Tickets</Link>
          <Link>Logout</Link>
        </div>
      </div>

      {/* Statistics */}

      <div className="stats">
        <div className="stat-card">
          <p>My Tickets</p>
          <h2>12</h2>
          <span>Assigned to you</span>
        </div>

        <div className="stat-card">
          <p>In Progress</p>
          <h2>4</h2>
          <span>Currently working</span>
        </div>

        <div className="stat-card">
          <p>Completed</p>
          <h2>38</h2>
          <span>Tickets solved</span>
        </div>

        <div className="stat-card">
          <p>Urgent</p>
          <h2>2</h2>
          <span>Need attention</span>
        </div>
      </div>
    </Container>
  )
}
