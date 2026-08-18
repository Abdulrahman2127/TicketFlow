import express from 'express'
import {authenticate} from '../middleware/authMiddleware.js'
import {createTicketController} from "../controllers/ticketControllers.js"
const router = express.Router()

router.post("/tickets", authenticate, createTicketController);


export default router;