import { useNavigate } from "react-router-dom";
import "../../Styles/TicketDetails.css"
export default function TicketDetails() {
  const navigate = useNavigate();

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
          <strong>Title:</strong> Laptop screen is not working
        </p>

        <p>
          <strong>Department:</strong> Hardware
        </p>

        <p>
          <strong>Employee:</strong> Abdulrahman
        </p>

        <p>
          <strong>Email:</strong> employee@techzone.test
        </p>

        <div>
          <strong>Description:</strong>

          <p>
            The laptop screen is not displaying anything.
            I tried restarting the device, but the problem
            is still happening.
          </p>
        </div>
      </div>

    </div>
  );
}