import express from "express";
import {register , employeeLogin} from "../controllers/employeeControllers.js"

const router = express.Router();

router.post("/register" , register);
router.post("/login" , employeeLogin);


export default router;
