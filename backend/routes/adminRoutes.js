import express from "express";
import { createAdmin , adminLogin , getWorkspace } from "../controllers/adminControllers.js";
import {authenticate} from "../middleware/authMiddleware.js"
const router = express.Router();

router.post("/signup", createAdmin);
router.post("/login", adminLogin);
router.get("/workspace" , authenticate , getWorkspace );

export default router;