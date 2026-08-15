import express from 'express'
import { requestToJoin } from '../controllers/joinRequestControllers.js'
import {authenticate} from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/workspace/request', authenticate, requestToJoin);

export default router;
