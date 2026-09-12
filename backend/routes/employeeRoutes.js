import express from "express";
import {register , employeeLogin , searchWorkspace , getMyWorkspaceStatus , logoutEmp} from "../controllers/employeeControllers.js"
import {authenticate} from "../middleware/authMiddleware.js"
import { loginLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/register" , loginLimiter, register);
router.post("/login" , loginLimiter , employeeLogin);
router.get("/workspace/search", authenticate, searchWorkspace);
router.get("/workspace/my-status", authenticate, getMyWorkspaceStatus);
router.post("/logout/emp" , authenticate ,  logoutEmp);

export default router;
