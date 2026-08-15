import express from "express";
import {register , employeeLogin , searchWorkspace} from "../controllers/employeeControllers.js"
import {authenticate} from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/register" , register);
router.post("/login" , employeeLogin);
router.get("/workspace/search", authenticate, searchWorkspace);


export default router;
