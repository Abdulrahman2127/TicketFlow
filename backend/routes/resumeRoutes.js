import express from "express";
import {postResume , getResume ,generateResumePDF } from "../controllers/resumeControllers.js"
const router = express.Router();

router.post("/generate" , postResume)


router.get("/:id" , getResume);

router.get("/:id/pdf", generateResumePDF);
export default router;