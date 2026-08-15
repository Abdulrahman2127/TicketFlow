import Container from '@mui/material/Container'
import '../../Styles/Dashboard.css'
import { Link , useNavigate  } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';

export default function ITManagerDashboard() {
  const [ITWorkspace, setITWorkspace] = useState('')
  const [workspaceCode, setWorkspaceCode] = useState('')
  const [organization, setOrganization] = useState('')
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
  
   const logout = async () => {
      try{
        const res = await axios.post("http://localhost:5001/api/admin/logout",{},
      {
        withCredentials: true,
      })
        console.log(res.data)
        navigate("/")
      }catch(error){
        console.log(error)
      }
    }
 

  useEffect(() => {
    getWorkspace()
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
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link>Dashboard</Link>
          <a href='#JoinRequests'>Join Requests</a>
          <a href='#Employees'>Employees</a>
          <LogoutIcon style={{cursor: "pointer" , color: "#e01919"}} onClick={logout} to="/">Logout</LogoutIcon>
        </div>
      </div>
      <hr></hr>

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
      <br></br>
      <br></br>
      <br></br>
      <hr></hr>
      {/* Tickets */}
      <section id="Tickets" style={{ marginTop: '50px', textAlign: 'center' }}>
        <h2 style={{ color: '#9ca3af' }}> Open Tickets</h2>

        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
      <br></br>
      <br></br>
      <br></br>
      <hr></hr>
      {/* Employees */}
      <section id='Employees' style={{ textAlign: 'center' , marginTop: '50px' }}>
        <h2 style={{ color: '#9ca3af' }}>Employees</h2>
        <div>
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
              <tr>
                <td style={tdStyle}>Ahmed Alharbi</td>
                <td style={tdStyle}>ahmed@techzone.test</td>
                <td style={tdStyle}>Employee</td>
                <td style={tdStyle}>Active</td>
                <td style={tdStyle}>
                  <Button variant="outlined" size="small">
                    View
                  </Button>
                </td>
              </tr>

              <tr>
                <td style={tdStyle}>Khalid Almutairi</td>
                <td style={tdStyle}>khalid@techzone.test</td>
                <td style={tdStyle}>Employee</td>
                <td style={tdStyle}>Active</td>
                <td style={tdStyle}>
                  <Button variant="outlined" size="small">
                    View
                  </Button>
                </td>
              </tr>

              <tr>
                <td style={tdStyle}>Mohammed Alotaibi</td>
                <td style={tdStyle}>mohammed@techzone.test</td>
                <td style={tdStyle}>Employee</td>
                <td style={tdStyle}>Active</td>
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
      <br></br>
      <br></br>
      <br></br>
      <hr></hr>
      {/* Join Requests */}
      <section id='JoinRequests' style={{ marginTop: '50px', textAlign: 'center' }}>
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
              <tr>
                <td style={tdStyle}>Ahmed Alharbi</td>
                <td style={tdStyle}>ahmed@techzone.test</td>
                <td style={tdStyle}>Employee</td>
                <td style={tdStyle}>Pending</td>
                <td style={tdStyle}>
                  <Button variant="contained" size="small">
                    Accept
                  </Button>

                  <Button variant="outlined" size="small" sx={{ ml: 1 }}>
                    Reject
                  </Button>
                </td>
              </tr>

              <tr>
                <td style={tdStyle}>Khalid Almutairi</td>
                <td style={tdStyle}>khalid@techzone.test</td>
                <td style={tdStyle}>Employee</td>
                <td style={tdStyle}>Pending</td>
                <td style={tdStyle}>
                  <Button variant="contained" size="small">
                    Accept
                  </Button>

                  <Button variant="outlined" size="small" sx={{ ml: 1 }}>
                    Reject
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <br></br>
      <br></br>
      <br></br>
    </Container>
  )
}
