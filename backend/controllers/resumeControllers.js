import Resume from '../models/Resume.js'
import client from '../config/openai.js'
import puppeteer from 'puppeteer'
import resumeTemplate from "../templates/resumeTemplate.js";

export const postResume = async (req, res) => {
  try {
    const { summary, description, projectDescription } = req.body

    const completion = await client.chat.completions.create({
      model: 'openrouter/free',
      messages: [
        {
          role: 'system',
          content:
            'You are an ATS resume expert. Improve the resume professionally.',
        },
        {
          role: 'user',
          content: `
Summary:
${summary}

Work Experience:
${description}

Project Description:
${projectDescription}

Return ONLY valid JSON.

Do not use markdown.
Do not wrap the response inside \`\`\`json.
Return raw JSON only.

Example:

{
  "summary": "...",
  "description": "...",
  "projectDescription": "..."
}
`,
        },
      ],
    })

    const result = completion.choices[0].message.content

    console.log(result)

    const cleanJson = result
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    const aiResponse = JSON.parse(cleanJson)

    const resume = new Resume({
      ...req.body,
      summary: aiResponse.summary,
      description: aiResponse.description,
      projectDescription: aiResponse.projectDescription,
    })

    await resume.save()

    res.status(201).json({
      message: 'Resume generated successfully',
      resume,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: error.message,
    })
  }
}

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id)
    if (!resume) {
      return res.status(404).json({
        message: 'Resume not found',
      })
    }
    res.status(200).json(resume)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const generateResumePDF = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();

  const html = resumeTemplate(resume);

    await page.setContent(html);

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "20mm",
        right: "20mm",
      },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${resume.fullName}-Resume.pdf`
    );

    res.send(pdf);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
