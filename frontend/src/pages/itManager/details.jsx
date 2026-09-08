import { useNavigate, useParams } from "react-router-dom";
import "../../Styles/TicketDetails.css";
import axios from "axios";
import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function TicketDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialLoading, setInitialLoading] = useState(true)

  const [ticketDetails, setTicketDetails] = useState(null);

  const setDetails = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/details/ticket/${id}`,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      setTicketDetails(res.data.data);

    } catch (error) {
      console.log(error);
    } finally{
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    setDetails(id);
  }, [id]);

  
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

  return (
    <div className="ticket-details">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1>Ticket Details</h1>

      <div className="ticket-info">

        <p>
          <strong>Employee:</strong>{" "}
          {ticketDetails.user?.userName}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {ticketDetails.user?.email}
        </p>

        <p>
          <strong>Title:</strong>{" "}
          {ticketDetails.title}
        </p>

        <p>
          <strong>Department:</strong>{" "}
          {ticketDetails.department}
        </p>

        

        <div>
          <strong>Description:</strong>

          <p>
            {ticketDetails.description}
          </p>
        </div>

      </div>

    </div>
  );
}