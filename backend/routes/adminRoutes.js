import express from "express";
import { createAdmin , adminLogin } from "../controllers/adminControllers.js";
const router = express.Router();

router.post("/signup", createAdmin);
router.post("/login", adminLogin);

export default router;