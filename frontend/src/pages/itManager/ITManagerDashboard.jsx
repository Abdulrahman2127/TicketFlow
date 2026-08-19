import Container from '@mui/material/Container'
import '../../Styles/Dashboard.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import toast from 'react-hot-toast'
import moment from 'moment';


export default function ITManagerDashboard() {
  const [ITWorkspace, setITWorkspace] = useState('')
  const [workspaceCode, setWorkspaceCode] = useState('')
  const [organization, setOrganization] = useState('')
  const [joinRequests, setJoinRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [tickets, setTickets] = useState([])
  const [employees, setEmployees] = useState([])

  const navigate = useNavigate()

  const thStyle = {
    
    padding: '14px 16px',
    borderBottom: '2px solid #e0e0e0',
  }

  const tdStyle = {
    
    padding: '14px 16px',
    borderBottom: '1px solid #e0e0e0',
  }

  // Get workspace
  const getWorkspace = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/admin/workspace', {
        withCredentials: true,
      })
      const workspace = res.data.workspace
      setITWorkspace(workspace.ITWorkspace)
      setWorkspaceCode(workspace.workspaceCode)
      setOrganization(workspace.organization)
    } catch (error) {
      console.log(error)
    }
  }

  // Get employees
  const getEmployees = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        'http://localhost:5001/api/admin/workspace/employees',
        { withCredentials: true }
      )
      setEmployees(res.data.employees)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // Logout
  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:5001/api/admin/logout',
        {},
        { withCredentials: true }
      )
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const getJoinRequests = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5001/api/admin/workspace/requests',
        { withCredentials: true }
      )
      setJoinRequests(res.data.requests)
    } catch (error) {
      console.log(error)
    }
  }

  const acceptRequest = async (requestId) => {
    try {
      await axios.patch(
        `http://localhost:5001/api/admin/workspace/requests/${requestId}/accept`,
        {},
        { withCredentials: true }
      )
      getJoinRequests()
      getEmployees()
      toast.success('Accepted successfully!')
    } catch (error) {
      console.log(error)
    }
  }

  const rejectRequest = async (requestId) => {
    try {
      await axios.patch(
        `http://localhost:5001/api/admin/workspace/requests/${requestId}/reject`,
        {},
        { withCredentials: true }
      )
      toast.success('Join request rejected!')
      getJoinRequests()
    } catch (error) {
      console.log(error)
    }
  }

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:5001/api/admin/get/ticket', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      setTickets(res.data.data || [])
    } catch (error) {
      console.error('Error fetching tickets:', error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getWorkspace()
    getEmployees()
    getJoinRequests()
    fetchTickets()
  }, [])

  if (!ITWorkspace && !organization) {
    return (
      <div style={{ marginTop: '250px', textAlign: 'center' }}>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>{ITWorkspace}</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="#">Dashboard</Link>
          <a href="#Tickets">Tickets</a>
          <a href="#JoinRequests">Join Requests</a>
          <a href="#Employees">Employees</a>
          <LogoutIcon
            style={{ cursor: 'pointer', color: '#e01919' }}
            onClick={logout}
          />
        </div>
      </div>

      <hr />

      <section style={{ marginBottom: '30px' }}>
        <h4>{organization}</h4>
        <p style={{ color: '#9ca3af' }}>
          Invite Code: <span>{workspaceCode}</span>
        </p>
        <p style={{ color: '#9ca3af' }}>Here’s an overview of your tickets.</p>
      </section>

      {/* Statistics */}
      <div className="stats">
        <div className="stat-card">
          <p>Total Tickets</p>
          <h2>{tickets.length}</h2>
          <span>All submissions</span>
        </div>

        <div className="stat-card">
          <p>Employees</p>
          <h2>{employees.length}</h2>
          <span>Active members</span>
        </div>

        <div className="stat-card">
          <p>Pending Requests</p>
          <h2>{joinRequests.length}</h2>
          <span>Awaiting approval</span>
        </div>

        <div className="stat-card">
          <p>Status</p>
          <h2>Active</h2>
          <span>Workspace operational</span>
        </div>
      </div>

      <br />
      <br />

      <hr />

      {/* Tickets Section */}
      <section id="Tickets" style={{ marginTop: '50px', textAlign: 'center' }}>
        <h2 style={{ color: '#9ca3af' }}>Open Tickets</h2>
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '20px' }}>
                    No tickets found.
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr key={ticket._id}>
                    <td style={tdStyle}>{ticket.title}</td>
                    <td style={tdStyle}>{ticket.department}</td>
                    <td style={tdStyle}>
                    {moment(ticket.createdAt).format('MMM DD, YYYY')}
                  </td>
                    <td style={tdStyle}>
                      <Button variant="outlined" size="small">
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <br />
      <br />

      <hr />

      {/* Employees Section */}
      <section id="Employees" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2 style={{ color: '#9ca3af' }}>Employees</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td style={tdStyle}>{employee.userName}</td>
                  <td style={tdStyle}>{employee.email}</td>
                  <td style={tdStyle}>Employee</td>
                  <td style={tdStyle}>Active</td>
                  <td style={tdStyle}>
                    <Button variant="outlined" size="small">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <br />
      <br />

      <hr />

      {/* Join Requests Section */}
      <section id="JoinRequests" style={{ marginTop: '50px', textAlign: 'center' }}>
        <h1 style={{ color: '#9ca3af' }}>Join Requests</h1>
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#9ca3af' }}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {joinRequests.map((request) => (
                <tr key={request.requestId}>
                  <td style={tdStyle}>{request.employeeName}</td>
                  <td style={tdStyle}>{request.employeeEmail}</td>
                  <td style={tdStyle}>Employee</td>
                  <td style={tdStyle}>{request.status}</td>
                  <td style={tdStyle}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => acceptRequest(request.requestId)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ ml: 1 }}
                      onClick={() => rejectRequest(request.requestId)}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <br />
      <br />
    </Container>
  )
}