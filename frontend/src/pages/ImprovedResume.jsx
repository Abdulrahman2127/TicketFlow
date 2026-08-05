import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import "../Styles/Improved.css";
import axios from "axios";
import { useState } from "react";

export default function Improved() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    summary: "",
    company: "",
    position: "",
    description: "",
    university: "",
    degree: "",
    skills: "",
    projectName: "",
    projectDescription: "",
  });

  const generateResume  = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/resume/generate`,
        formData
      );

      setFormData({
        fullName: "",
        jobTitle: "",
        email: "",
        summary: "",
        company: "",
        position: "",
        description: "",
        university: "",
        degree: "",
        skills: "",
        projectName: "",
        projectDescription: "",
      });
      
      console.log(response.data);
      navigate(`/preview/${response.data.resume._id}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Container maxWidth="md" className="page-container">
      <div className="resume-card">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>

        <h1 className="title">📄 Resume Builder</h1>

        <h2>👤 Personal Information</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={(e) =>
            setFormData({ ...formData, jobTitle: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <h2>📝 Professional Summary</h2>

        <textarea
          rows="5"
          placeholder="Write a short summary about yourself..."
          value={formData.summary}
          onChange={(e) =>
            setFormData({ ...formData, summary: e.target.value })
          }
        ></textarea>

        <h2>💼 Work Experience</h2>

        <input
          type="text"
          placeholder="Company Name"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Position"
          value={formData.position}
          onChange={(e) =>
            setFormData({ ...formData, position: e.target.value })
          }
        />

        <textarea
          rows="4"
          placeholder="Describe your responsibilities..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>

        <h2>🎓 Education</h2>

        <input
          type="text"
          placeholder="University"
          value={formData.university}
          onChange={(e) =>
            setFormData({ ...formData, university: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Degree"
          value={formData.degree}
          onChange={(e) =>
            setFormData({ ...formData, degree: e.target.value })
          }
        />

        <h2>🛠 Skills</h2>

        <textarea
          rows="3"
          placeholder="React, Node.js, Express..."
          value={formData.skills}
          onChange={(e) =>
            setFormData({ ...formData, skills: e.target.value })
          }
        ></textarea>

        <h2>📂 Projects</h2>

        <input
          type="text"
          placeholder="Project Name"
          value={formData.projectName}
          onChange={(e) =>
            setFormData({ ...formData, projectName: e.target.value })
          }
        />

        <textarea
          rows="3"
          placeholder="Project Description..."
          value={formData.projectDescription}
          onChange={(e) =>
            setFormData({
              ...formData,
              projectDescription: e.target.value,
            })
          }
        ></textarea>

        <button className="generate-btn" onClick={generateResume }>
          Generate Resume with AI
        </button>
        
      </div>
    </Container>
  );
}