import express from "express";
import {register , postLogin} from "../controllers/employeeControllers.js"

const router = express.Router();

router.post("/register" , register);
router.post("/login" , postLogin);


export default router;
