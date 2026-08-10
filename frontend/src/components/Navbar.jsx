import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <>
      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '50px',
          alignItems: 'center',
          marginTop: '15px',
          padding: '7px',
          fontSize: '18px',
        }}
      >
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/titleCard">+ Add Resume</Link>
        </div>
        <div>
          <Link to="/">Logout</Link>
        </div>
        <div>
          <Link to="/dashboard">My Resumes</Link>
        </div>
      </section>
    </>
  )
}
