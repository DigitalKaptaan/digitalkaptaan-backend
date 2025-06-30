import { Router } from 'express'
import {
  getContact,
  getCustomerRequests,
  submitCustomerRequest,
  upsertContact
} from '../controllers'
import { authenticate, authorizeRoles, validate } from '../middlewares'
import { contactUpsertSchema, createCustomerRequestSchema } from '../validators'
import { ROLES } from '../constants'

const router = Router()

// Public Routes
router.post('/customer-request', validate(createCustomerRequestSchema), submitCustomerRequest)
router.get('/', getContact)

// Admin-only routes
router.get('/customer-request', authenticate, authorizeRoles(ROLES.ADMIN), getCustomerRequests)

router.post(
  '/',
  authenticate,
  authorizeRoles(ROLES.ADMIN),
  validate(contactUpsertSchema),
  upsertContact
)

export default router
