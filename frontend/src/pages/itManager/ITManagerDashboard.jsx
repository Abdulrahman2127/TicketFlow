import Container from '@mui/material/Container'
import '../../Styles/Dashboard.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

export default function ITManagerDashboard() {
  const [ITWorkspace, setITWorkspace] = useState('')
  const [workspaceCode, setWorkspaceCode] = useState('')
  const [organization, setOrganization] = useState('')
  const [joinRequests, setJoinRequests] = useState([])
  // Employees
  const [employees, setEmployees] = useState([])

  const navigate = useNavigate()

  const thStyle = {
    textAlign: 'center',
    padding: '14px 16px',
    borderBottom: '2px solid #e0e0e0',
  }

  const tdStyle = {
    padding: '14px 16px',
    borderBottom: '1px solid #e0e0e0',
  }

  const buttonStyle = {
    padding: '7px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
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

      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  // Get employees
  const getEmployees = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5001/api/admin/workspace/employees',
        {
          withCredentials: true,
        },
      )

      setEmployees(res.data.employees)

      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Logout
  const logout = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5001/api/admin/logout',
        {},
        {
          withCredentials: true,
        },
      )

      console.log(res.data)

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const getJoinRequests = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5001/api/admin/workspace/requests',
        {
          withCredentials: true,
        },
      )

      setJoinRequests(res.data.requests)
    } catch (error) {
      console.log(error)
    }
  }

  const acceptRequest = async (requestId) => {
    try {
      const res = await axios.patch(
        `http://localhost:5001/api/admin/workspace/requests/${requestId}/accept`,
        {},
        {
          withCredentials: true,
        },
      )

      console.log(res.data)

      getJoinRequests()

      getEmployees()
    } catch (error) {
      console.log(error)
    }
  }

  const rejectRequest = async (requestId) => {
    try {
      const res = await axios.patch(
        `http://localhost:5001/api/admin/workspace/requests/${requestId}/reject`,
        {},
        {
          withCredentials: true,
        },
      )

      console.log(res.data)

      // تحديث الطلبات
      getJoinRequests()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getWorkspace()
    getEmployees()
    getJoinRequests()
  }, [])

  if (!ITWorkspace && !organization) {
    return (
      <div style={{ marginTop: '250px', marginLeft: '650px' }}>
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

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Link>Dashboard</Link>

          <a href="#JoinRequests">Join Requests</a>

          <a href="#Employees">Employees</a>

          <LogoutIcon
            style={{
              cursor: 'pointer',
              color: '#e01919',
            }}
            onClick={logout}
          >
            Logout
          </LogoutIcon>
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

      <br />
      <br />
      <br />

      <hr />

      {/* Tickets */}

      <section
        id="Tickets"
        style={{
          marginTop: '50px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: '#9ca3af' }}>Open Tickets</h2>

        <div>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Message</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={tdStyle}>Laptop is not working</td>

                <td style={tdStyle}>Employee</td>

                <td style={tdStyle}>Open</td>

                <td style={tdStyle}>
                  <Button variant="outlined" size="small">
                    View
                  </Button>
                </td>
              </tr>

              <tr>
                <td style={tdStyle}>Wi-Fi connection problem</td>

                <td style={tdStyle}>Employee</td>

                <td style={tdStyle}>In Progress</td>

                <td style={tdStyle}>
                  <Button variant="outlined" size="small">
                    View
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <br />
      <br />
      <br />

      <hr />

      {/* Employees */}

      <section
        id="Employees"
        style={{
          textAlign: 'center',
          marginTop: '50px',
        }}
      >
        <h2 style={{ color: '#9ca3af' }}>Employees</h2>

        <div>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}
          >
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
        </div>
      </section>

      <br />
      <br />
      <br />

      <hr />

      {/* Join Requests */}

      <section
        id="JoinRequests"
        style={{
          marginTop: '50px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: '#9ca3af' }}>Join Requests</h1>

        <div>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              color: '#9ca3af',
            }}
          >
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
      <br />
    </Container>
  )
}
