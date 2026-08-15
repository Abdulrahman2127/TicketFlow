import express from 'express'
import {
  createAdmin,
  adminLogin,
  getWorkspace,
  adminLogout,
  getJoinRequests,
  acceptJoinRequest,
  getEmployees,
  rejectJoinRequest,
} from '../controllers/adminControllers.js'
import { authenticate } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/signup', createAdmin)
router.post('/login', adminLogin)
router.get('/workspace', authenticate, getWorkspace)
router.post('/logout', adminLogout)
router.get('/workspace/requests', authenticate, getJoinRequests)
router.patch(
  '/workspace/requests/:requestId/accept',
  authenticate,
  acceptJoinRequest,
)
router.get(
  "/workspace/employees",
  authenticate,
  getEmployees
);

router.patch(
  "/workspace/requests/:requestId/reject",
  authenticate,
  rejectJoinRequest
);

export default router
