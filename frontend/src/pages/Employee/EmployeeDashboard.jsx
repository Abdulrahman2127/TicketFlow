import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import "../../Styles/Login.css"
export default function EmployeeDashboard() {
  const [workspace, setWorkspace] = useState(null)
  const [workspaceCode, setWorkspaceCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [requestLoading, setRequestLoading] = useState(false)
  const [requestStatus, setRequestStatus] = useState(null)

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
        `http://localhost:5001/api/authentication/workspace/search?workspaceCode=${workspaceCode.trim()}`,
        {
          withCredentials: true,
        },
      )

      setWorkspace(res.data.workspace)
      setRequestStatus(res.data.requestStatus)
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
        'http://localhost:5001/api/join-request/workspace/request',
        {
          workspaceId: workspace._id,
        },
        {
          withCredentials: true,
        },
      )
      toast.success('Join request sent!')
      console.log(res.data)

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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0b0f14',
        color: '#f8fafc',
      }}
    >
      <Container maxWidth="lg">
        {/* Back Button */}
        <Box sx={{ pt: 4 }}>
          <Button
            href="/"
            sx={{
              color: '#9ca3af',
              textTransform: 'none',
              fontSize: '16px',
              padding: 0,

              '&:hover': {
                color: '#ffffff',
                backgroundColor: 'transparent',
              },
            }}
          >
            ← Back
          </Button>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 8,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              textAlign: 'center',
              mb: 5,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: '#f8fafc',
                mb: 1,
              }}
            >
              Welcome 👋
            </Typography>

            <Typography
              sx={{
                color: '#9ca3af',
                fontSize: '17px',
              }}
            >
              Find your IT workspace to get started.
            </Typography>
          </Box>

          {/* Search */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 700,
            }}
          >
            <Typography
              sx={{
                color: '#f8fafc',
                fontWeight: 600,
                mb: 1.5,
              }}
            >
              Workspace Code
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                value={workspaceCode}
                onChange={(e) => {
                  setWorkspaceCode(e.target.value)
                  setErrorMessage('')
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    searchWorkspace()
                  }
                }}
                placeholder="Enter workspace code..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#f8fafc',
                    backgroundColor: '#0b0f14',

                    '& fieldset': {
                      borderColor: '#374151',
                    },

                    '&:hover fieldset': {
                      borderColor: '#4b5563',
                    },

                    '&.Mui-focused fieldset': {
                      borderColor: '#2563eb',
                    },
                  },

                  '& input::placeholder': {
                    color: '#9ca3af',
                    opacity: 1,
                  },
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

                  '&:hover': {
                    backgroundColor: '#1d4ed8',
                  },
                }}
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </Box>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 700,
              borderTop: '1px solid #20262e',
              mt: 7,
              mb: 6,
            }}
          />

          {/* Loading */}
          {loading && (
            <Typography
              sx={{
                color: '#9ca3af',
                fontSize: '18px',
              }}
            >
              Searching...
            </Typography>
          )}

          {/* Error */}
          {!loading && errorMessage && (
            <Typography
              sx={{
                color: '#ef4444',
                fontSize: '18px',
              }}
            >
              {errorMessage}
            </Typography>
          )}

          {/* Workspace Found */}
          {!loading && workspace && (
            <Box
              sx={{
                width: '100%',
                maxWidth: 700,
              }}
            >
              <Typography
                sx={{
                  color: '#9ca3af',
                  fontSize: '32px',
                  mb: 3,
                }}
              >
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
                  {/* IT Workspace */}
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

                  {/* Organization */}
                  <Typography
                    sx={{
                      color: '#9ca3af',
                      mb: 1,
                    }}
                  >
                    {workspace.organization}
                  </Typography>

                  {/* Workspace Code */}
                  <Typography
                    sx={{
                      color: '#9ca3af',
                      mb: 3,
                    }}
                  >
                    {workspace.workspaceCode}
                  </Typography>

                  {/* Request Button */}
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
                      '&.Mui-disabled': {
                        backgroundColor: '#aba8a8',
                      }
                    }}
                  >
                    {requestLoading
                      ? 'Sending...'
                      : requestStatus === 'pending'
                        ? 'Request Pending'
                        : requestStatus === 'accepted'
                          ? 'Joined ✓'
                          : requestStatus === 'rejected'
                            ? 'Request to Join'
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
