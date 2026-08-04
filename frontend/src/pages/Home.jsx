import "../Styles/Home.css"

import { Link } from "react-router-dom"
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Home(){
  
    return(
        <div>
        {/* NAVBARR */}
      <div className="navbar">
        <div style={{ marginLeft: '70px' }}>
          <h1 style={{ color: '#2563EB' }}>ResumeAI</h1>
        </div>
        <div style={{ display: "flex" , justifyContent: "center", alignItems: "center" , gap: "20px" , marginRight: "50px" , color: "#ffffff78" , cursor: "pointer"}}>
          
          
          <a href="#Features">Features</a>
          <a href="#roadmap">Coming Soon ⭐</a>
          <a href="#homeItWorks">How it Works</a>
          
        </div>
      </div>
      <hr></hr>
      {/* === NAVBARR === */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <h1 style={{ color: '#FFFFFF' }}>
              Build Your Professional Resume with AI
            </h1>

            <p>
              Create, improve, and manage professional resumes in minutes using
              AI.
            </p>

            <div className="hero-buttons">
              <Link to="/improved">
              <button className="getStarted"
                style={{
                  background: '#2563EB',
                  border: 'none',
                  padding: '15px',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                }}
              >
                Get Started
              </button>
              </Link>
              <a href="#Features">
              <button className="learnMore"
                style={{
                  background: '#091c46',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '13px',
                  border: 'solid #2563EB 2px',
                  borderRadius: '8px',
                }}
              >
                Learn More →
              </button>
              </a>
            </div>

            <div className="hero-features">
              <span>✔ AI Powered</span>
              <span>✔ PDF Export</span>
              <span>✔ No Account Required</span>
            </div>
          </div>

          <div className="hero-right"><img src="/cv.png" alt="" /></div>
        </div>
      </section>
      <hr></hr>
      <section id="Features" className="details">
        <h1 style={{ fontSize: '45px', fontWeight: 'bold' }}>Why ResumeAI?</h1>

        <div className="details-container">
          <div>🤖 AI Writing</div>

          <div>📄 ATS Friendly</div>

          <div>☁ Save Multiple Resumes</div>

          <div>📥 Export PDF</div>
        </div>
      </section>
      <hr></hr>
      <section id="homeItWorks" className="how-it-works">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">
            <div className="step-icon">📝</div>

            <h3>Fill Your Information</h3>

            <p>
              Enter your personal details, skills, education, and experience.
            </p>
          </div>

          <div className="step">
            <div className="step-icon">🤖</div>

            <h3>AI Improves It</h3>

            <p>
              AI rewrites your resume, enhances descriptions, and creates a
              professional summary.
            </p>
          </div>

          <div className="step">
            <div className="step-icon">📥</div>

            <h3>Download or Save</h3>

            <p>
              Export your resume as PDF or save multiple resumes.
            </p>
          </div>
        </div>
      </section>
      <hr></hr>
      <section  className="coming-soon" id="roadmap">
  <div className="container">
    <h5>ROADMAP</h5>

    <h2>Coming Soon</h2>

    <p className="subtitle">
      The website will undergo some improvements, and these are the plans.
    </p>

    <div className="cards">

      <div className="card">
        <span className="badge">Coming Soon</span>
        <h3>🔐 User Authentication</h3>
        <p>
          It will allow the user to create an account or log in if they already have one.
        </p>
      </div>

      <div className="card">
        <span className="badge">Coming Soon</span>
        <h3>📂 Resume Dashboard</h3>
        <p>
          All resumes can be viewed and managed.
        </p>
      </div>

      

      <div className="card">
        <span className="badge">Coming Soon</span>
        <h3>✏️ Edit Anytime</h3>
        <p>
          The resume can be edited later.
        </p>
      </div>

      <div className="card">
        <span className="badge">Coming Soon</span>
        <h3>🗑 Delete Resumes</h3>
        <p>
          You can delete the resume you do not want.
        </p>
      </div>

      <div className="card">
        <span className="badge">Coming Soon</span>
        <h3>☁️ Cloud Storage</h3>
        <p>
          All resumes will be stored in MongoDB🌳.
        </p>
      </div>

    </div>
  </div>
</section>
    <hr></hr>
      <footer
        style={{ marginBottom: '0px', textAlign: 'center', color: '#ffffff5d' , display: "flex" , justifyContent: "center" }}
      >
        <p style={{ marginBottom: '15px'  , marginTop: "20px"}}>
          Designed and developed by Abdulrahman2127 © 2026
        </p>
        <a href="https://github.com/Abdulrahman2127" style={{marginTop: "17px" , marginLeft: "10px" , cursor: "pointer"}}><GitHubIcon/></a>
      </footer>
        </div>
    )
}