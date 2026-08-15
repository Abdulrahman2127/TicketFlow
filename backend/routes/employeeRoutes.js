import express from "express";
import {register , employeeLogin , getWorkspace} from "../controllers/employeeControllers.js"

const router = express.Router();

router.post("/register" , register);
router.post("/login" , employeeLogin);
router.get("/dashboard" , getWorkspace);


export default router;
