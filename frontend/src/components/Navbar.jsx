import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

export default function NavBar() {

  return (
    <>
      <section style={{display: "flex" , justifyContent: "space-between" , alignItems: "center"}}>
        <div>
          <h1 style={{ color: '#2563EB' }}>TicketFlow</h1>
        </div>
        <div style={{ display: "flex" , justifyContent: "center", alignItems: "center" , gap: "20px" , color: "#ffffff78" , cursor: "pointer"}}>
          
          
          <Link>Dashboard</Link>
          <Link>My Tickets</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </section>
      
    </>
  )
}
