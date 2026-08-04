const resumeTemplate = (resume) => {
  return `
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

<style>

body{
    font-family:Arial,sans-serif;
    padding:40px;
    color:#222;
}

h1{
    text-align:center;
}

h2{
    border-bottom:2px solid #000;
    padding-bottom:6px;
}

.section{
    margin-top:25px;
}

</style>

</head>

<body>

<h1>${resume.fullName}</h1>

<h3>${resume.jobTitle}</h3>

<p>${resume.email}</p>

<div class="section">
<h2>Professional Summary</h2>
<p>${resume.summary}</p>
</div>

<div class="section">
<h2>Technical Skills</h2>
<p>${resume.skills}</p>
</div>

<div class="section">
<h2>Work Experience</h2>

<h3>${resume.position}</h3>

<p>${resume.company}</p>

<p>${resume.description}</p>

</div>

<div class="section">
<h2>Projects</h2>

<h3>${resume.projectName}</h3>

<p>${resume.projectDescription}</p>

</div>

<div class="section">
<h2>Education</h2>

<h3>${resume.degree}</h3>

<p>${resume.university}</p>

</div>

</body>

</html>
`;
};

export default resumeTemplate;