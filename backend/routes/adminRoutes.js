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
  getAdminTicketsController,
  deleteTicketController,
  detailsTicketController,
  deleteEmployee
} from '../controllers/adminControllers.js'
import { authenticate } from '../middleware/authMiddleware.js'
import { loginLimiter } from "../middleware/rateLimiter.js";


const router = express.Router()

router.post('/signup', loginLimiter , createAdmin)
router.post('/login', loginLimiter , adminLogin)
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

router.delete(
  "/ticket/admin/delete/:id",
  authenticate,
  deleteTicketController
);
router.get("/get/ticket" , authenticate , getAdminTicketsController);
router.get("/details/ticket/:id" , authenticate , detailsTicketController);
router.delete("/employees/:employeeId", authenticate, deleteEmployee);


export default router;
