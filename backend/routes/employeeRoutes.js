import express from "express";
import {register , employeeLogin , getWorkspace} from "../controllers/employeeControllers.js"
import {authenticate} from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/register" , register);
router.post("/login" , employeeLogin);
router.get("/dashboard" , authenticate , getWorkspace);


export default router;
