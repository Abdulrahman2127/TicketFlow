import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import axios from 'axios'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import '../../Styles/Login.css'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link , useNavigate } from 'react-router-dom'
import { withEmotionCache } from '@emotion/react'

export default function EmployeeDashboard() {
  const [workspace, setWorkspace] = useState(null)
  const [workspaceCode, setWorkspaceCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [requestLoading, setRequestLoading] = useState(false)
  const [requestStatus, setRequestStatus] = useState(null)
  const [isMember, setIsMember] = useState(false)

  const [title , setTitle] = useState("");
  const [department , setDepartment] = useState("");
  const [description , setDescription] = useState("");

    const navigate = useNavigate()

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/authentication/workspace/my-status`,
          { withCredentials: true },
        )

        if (res.data.isMember) {
          setIsMember(true)
          setWorkspace(res.data.workspace)
          setRequestStatus('accepted')
        } else if (res.data.requestStatus === 'pending') {
          setRequestStatus('pending')
        }
      } catch (error) {
        console.log(error)
      } finally {
        setInitialLoading(false)
      }
    }

    checkStatus()
  }, [])

  const searchWorkspace = async () => {
    if (!workspaceCode.trim()) {
      setErrorMessage('Please enter a workspace code')
      setWorkspace(null)
      setRequestStatus(null)
      return
    }

    try {
      setLoading(true)
      setWorkspace(null)
      setErrorMessage('')
      setRequestStatus(null)

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/authentication/workspace/search?workspaceCode=${workspaceCode.trim()}`,
        { withCredentials: true },
      )

      setWorkspace(res.data.workspace)
      setRequestStatus(res.data.requestStatus)

      if (res.data.requestStatus === 'accepted') {
        setIsMember(true)
      }
    } catch (error) {
      console.log(error)
      if (error.response?.status === 404) {
        setErrorMessage('Workspace not found')
      } else {
        setErrorMessage('Something went wrong. Please try again.')
      }
      setWorkspace(null)
      setRequestStatus(null)
    } finally {
      setLoading(false)
    }
  }

  const requestToJoin = async () => {
    if (!workspace) return

    try {
      setRequestLoading(true)

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/join-request/workspace/request`,
        { workspaceId: workspace._id },
        { withCredentials: true },
      )
      toast.success('Join request sent!')
      setRequestStatus('pending')
    } catch (error) {
      console.log(error)
      if (error.response?.status === 400) {
        setRequestStatus('pending')
      }
    } finally {
      setRequestLoading(false)
    }
  }

  const submitTicket = async () => {
    try{
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/submit/tickets` , {title , department , description} , {withCredentials : true} )
      console.log(res.data);
      setDepartment("");
      setTitle("");
      setDescription("");
      setDepartment(res.data);
      setTitle(res.data);
      setDescription(res.data);
    }catch(error){
      console.log(error)
    }
  }


  const logout = async () => {
    try{
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/authentication/logout/emp` , {} , { withCredentials: true })
      navigate("/")
      console.log(res.data)
    }catch(error){
      console.log(error);
    }
  }

  if (initialLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#0b0f14',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ color: '#2563eb' }} />
      </Box>
    )
  }

  if (isMember && workspace) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#0b0f14',
          color: '#f8fafc',
          p: 4,
        }}
      >
        <Container maxWidth="lg">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              {workspace.ITWorkspace} Dashboard
            </Typography>
            
              <LogoutIcon
                style={{
                  cursor: 'pointer',
                  color: '#e01919',
                  padding: '30px',
                  marginBottom: '20px',
                  fontSize: '30px',
                }}
                onClick={logout}
              >
                Logout
              </LogoutIcon>
            
          </div>
          <div>
            <Typography variant="h6" sx={{ color: '#9ca3af', mb: 4 }}>
              Organization: {workspace.organization}
            </Typography>
          </div>
          <Card
            sx={{
              backgroundColor: '#111827',
              border: '1px solid #263244',
              p: 3,
              borderRadius: '12px',
            }}
          >
            <Typography sx={{ color: '#cbcccd' }}>
              Submit a ticket and IT support team will get right on it.
            </Typography>
          </Card>
          <form style={{ marginTop: '50px' }}>
  <Card
    sx={{
      backgroundColor: '#111827',
      border: '1px solid #263244',
      p: 3,
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: "20px",
    }}
  >
    <TextField
      id="title"
      label="Title"
      variant="outlined"
      fullWidth
      sx={{
        '& .MuiInputBase-input': { color: '#ffffff'  },
        '& .MuiInputLabel-root': { color: '#94a3b8' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#60a5fa' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2b384e' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#475569' },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#60a5fa',
         
        },
        
      }}
      value={title}
      onChange={(e) => {setTitle(e.target.value)}}
    />

    <TextField
      id="department"
      label="Department"
      variant="outlined"
      fullWidth
      sx={{
        '& .MuiInputBase-input': { color: '#ffffff' },
        '& .MuiInputLabel-root': { color: '#94a3b8' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#60a5fa' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2b384e' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#475569' },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#60a5fa',
        },
      }}
      value={department}
      onChange={(e) => {setDepartment(e.target.value)}}
    />

    <TextField
      id="description"
      placeholder='Description of the problem or message...'
      variant="outlined"
      multiline
      rows={4}
      fullWidth
      sx={{
        '& .MuiInputBase-input': { color: '#ffffff' },
        '& .MuiInputLabel-root': { color: '#94a3b8' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#60a5fa' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2b384e' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#475569' },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#60a5fa',
        },
      }}
      value={description}
      onChange={(e) => {setDescription(e.target.value)}}
    />

    <Button
      type="submit"
      variant="contained"
      sx={{
        backgroundColor: '#2563eb',
        color: '#ffffff',
        fontWeight: 'bold',
        py: 1.2,
        borderRadius: '8px',
        '&:hover': {
          backgroundColor: '#1d4ed8',
        },
        '&:disabled':{
          background: 'gray'
        }
      }}
      onClick={submitTicket}
      disabled={!title || !department || !description}
    >
      submit 
    </Button>
  </Card>
</form>
        </Container>
      </Box>
    )
  }

  return (
    <Box
      sx={{ minHeight: '100vh', backgroundColor: '#0b0f14', color: '#f8fafc' }}
    >
      <Container maxWidth="lg">
        <Box sx={{ pt: 4 }}>
          <Button
            href="/"
            sx={{
              color: '#9ca3af',
              textTransform: 'none',
              fontSize: '16px',
              padding: 0,
              '&:hover': { color: '#ffffff', backgroundColor: 'transparent' },
            }}
          >
            ← Back
          </Button>
        </Box>

        <Box
          sx={{
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 8,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: '#f8fafc', mb: 1 }}
            >
              Welcome 👋
            </Typography>
            <Typography sx={{ color: '#9ca3af', fontSize: '17px' }}>
              Find your IT workspace to get started.
            </Typography>
          </Box>

          <Box sx={{ width: '100%', maxWidth: 700 }}>
            <Typography sx={{ color: '#f8fafc', fontWeight: 600, mb: 1.5 }}>
              Workspace Code
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                value={workspaceCode}
                onChange={(e) => {
                  setWorkspaceCode(e.target.value)
                  setErrorMessage('')
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') searchWorkspace()
                }}
                placeholder="Enter workspace code..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#f8fafc',
                    backgroundColor: '#0b0f14',
                    '& fieldset': { borderColor: '#374151' },
                    '&:hover fieldset': { borderColor: '#4b5563' },
                    '&.Mui-focused fieldset': { borderColor: '#2563eb' },
                  },
                  '& input::placeholder': { color: '#9ca3af', opacity: 1 },
                }}
              />

              <Button
                onClick={searchWorkspace}
                disabled={loading}
                variant="contained"
                sx={{
                  minWidth: 110,
                  textTransform: 'none',
                  backgroundColor: '#2563eb',
                  borderRadius: '6px',
                  '&:hover': { backgroundColor: '#1d4ed8' },
                }}
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              width: '100%',
              maxWidth: 700,
              borderTop: '1px solid #20262e',
              mt: 7,
              mb: 6,
            }}
          />

          {loading && (
            <Typography sx={{ color: '#9ca3af', fontSize: '18px' }}>
              Searching...
            </Typography>
          )}

          {!loading && errorMessage && (
            <Typography sx={{ color: '#ef4444', fontSize: '18px' }}>
              {errorMessage}
            </Typography>
          )}

          {!loading && workspace && (
            <Box sx={{ width: '100%', maxWidth: 700 }}>
              <Typography sx={{ color: '#9ca3af', fontSize: '32px', mb: 3 }}>
                Workspace found
              </Typography>

              <Card
                sx={{
                  backgroundColor: '#111827',
                  border: '1px solid #263244',
                  borderRadius: '12px',
                  boxShadow: 'none',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    sx={{
                      color: '#f8fafc',
                      fontSize: '21px',
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {workspace.ITWorkspace}
                  </Typography>

                  <Typography sx={{ color: '#9ca3af', mb: 1 }}>
                    {workspace.organization}
                  </Typography>

                  <Typography sx={{ color: '#9ca3af', mb: 3 }}>
                    {workspace.workspaceCode}
                  </Typography>

                  <Button
                    variant="outlined"
                    onClick={requestToJoin}
                    disabled={
                      requestLoading ||
                      requestStatus === 'pending' ||
                      requestStatus === 'accepted'
                    }
                    sx={{
                      color: '#3b82f6',
                      borderColor: '#2563eb',
                      textTransform: 'none',
                      borderRadius: '6px',
                      '&:hover': {
                        borderColor: '#60a5fa',
                        backgroundColor: 'rgba(37, 99, 235, 0.08)',
                      },
                      '&.Mui-disabled': { backgroundColor: '#aba8a8' },
                    }}
                  >
                    {requestLoading
                      ? 'Sending...'
                      : requestStatus === 'pending'
                        ? 'Request Pending'
                        : requestStatus === 'accepted'
                          ? 'Joined ✓'
                          : 'Request to Join'}
                  </Button>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  )
}
