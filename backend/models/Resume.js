import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    summary: {
      type: String,
      trim: true,
    },

    company: {
      type: String,
      trim: true,
    },

    position: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    university: {
      type: String,
      trim: true,
    },

    degree: {
      type: String,
      trim: true,
    },

    skills: {
      type: String,
      trim: true,
    },

    projectName: {
      type: String,
      trim: true,
    },

    projectDescription: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;