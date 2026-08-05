import '../Styles/Preview.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


export default function Preview() {
 
  const navigate = useNavigate()

  const { id } = useParams()
  const [resume, setResume] = useState(null)

  const fetch = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/resume/${id}`)
      setResume(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const downloadPDF = () => {
  window.open(
    `${import.meta.env.VITE_API_URL}/api/resume/${id}/pdf`,
    "_blank"
  );
};

  useEffect(() => {
    fetch(id)
  }, [id])
  
if (!resume) {
  return <h2>Loading...</h2>;
}
  return (
    <div className="preview-page">
      <div className="preview-navbar">
        

          <button className="back-btn"  onClick={() => navigate('/improved')}>← Back</button>
          <button onClick={downloadPDF} className="download-btn">Download PDF</button>
          
        
      </div>

      <div className="resume">
        {/* Header */}
        

        <header className="resume-header">
          <h1>{resume.fullName}</h1>

          <h3>{resume.jobTitle}</h3>

          <p>{resume.email}</p>
        </header>

        {/* Summary */}

        <section className="resume-section">
          <h2>Professional Summary</h2>

          <p>{resume.summary}</p>
        </section>

        {/* Skills */}

        <section className="resume-section">
          <h2>Technical Skills</h2>

          <div className="skills">
            {resume.skills.split(',').map((skill, index) => (
              <span key={index}>{skill.trim()}</span>
            ))}
          </div>
        </section>

        {/* Experience */}

        <section className="resume-section">
          <h2>Work Experience</h2>

          <div className="item">
            <div className="item-header">
              <h3>{resume.position}</h3>
            </div>

            <h4>{resume.company}</h4>

            <p>{resume.description}</p>
          </div>
        </section>

        {/* Projects */}

        <section className="resume-section">
          <h2>Projects</h2>

          <div className="item">
            <div className="item-header">
              <h3>{resume.projectName}</h3>
            </div>

            <p>{resume.projectDescription}</p>
          </div>
        </section>

        {/* Education */}

        <section className="resume-section">
          <h2>Education</h2>

          <div className="item">
            <div className="item-header">
              <h3>{resume.degree}</h3>
            </div>

            <h4>{resume.university}</h4>
          </div>
        </section>
      </div>
    </div>
  )
}
