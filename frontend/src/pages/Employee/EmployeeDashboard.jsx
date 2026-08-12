import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function EmployeeDashboard() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0b0f14",
        color: "#f8fafc",
      }}
    >
      <Container maxWidth="lg">
        {/* Back Button */}
        <Box sx={{ pt: 4 }}>
          <Button
            href="/"
            sx={{
              color: "#9ca3af",
              textTransform: "none",
              fontSize: "16px",
              padding: 0,

              "&:hover": {
                color: "#ffffff",
                backgroundColor: "transparent",
              },
            }}
          >
            ← Back
          </Button>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            minHeight: "calc(100vh - 80px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 8,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              textAlign: "center",
              mb: 5,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#f8fafc",
                mb: 1,
              }}
            >
              Welcome 👋
            </Typography>

            <Typography
              sx={{
                color: "#9ca3af",
                fontSize: "17px",
              }}
            >
              Find your IT workspace to get started.
            </Typography>
          </Box>

          {/* Search */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 700,
            }}
          >
            <Typography
              sx={{
                color: "#f8fafc",
                fontWeight: 600,
                mb: 1.5,
              }}
            >
              Workspace Code
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                placeholder="Enter workspace code..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#f8fafc",
                    backgroundColor: "#0b0f14",

                    "& fieldset": {
                      borderColor: "#374151",
                    },

                    "&:hover fieldset": {
                      borderColor: "#4b5563",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#2563eb",
                    },
                  },

                  "& input::placeholder": {
                    color: "#9ca3af",
                    opacity: 1,
                  },
                }}
              />

              <Button
                variant="contained"
                sx={{
                  minWidth: 110,
                  textTransform: "none",
                  backgroundColor: "#2563eb",
                  borderRadius: "6px",

                  "&:hover": {
                    backgroundColor: "#1d4ed8",
                  },
                }}
              >
                Search
              </Button>
            </Box>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 700,
              borderTop: "1px solid #20262e",
              mt: 7,
              mb: 6,
            }}
          />

          {/* Workspace Found */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 700,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#9ca3af",
                fontWeight: 600,
                mb: 3,
              }}
            >
              Workspace found
            </Typography>

            <Card
              sx={{
                backgroundColor: "#111827",
                border: "1px solid #263244",
                borderRadius: "12px",
                boxShadow: "none",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  sx={{
                    color: "#f8fafc",
                    fontSize: "21px",
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  TechZone IT Support
                </Typography>

                <Typography
                  sx={{
                    color: "#9ca3af",
                    mb: 3,
                  }}
                >
                  TechZone
                </Typography>

                <Button
                  variant="outlined"
                  sx={{
                    color: "#3b82f6",
                    borderColor: "#2563eb",
                    textTransform: "none",
                    borderRadius: "6px",

                    "&:hover": {
                      borderColor: "#60a5fa",
                      backgroundColor:
                        "rgba(37, 99, 235, 0.08)",
                    },
                  }}
                >
                  Request to Join
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}