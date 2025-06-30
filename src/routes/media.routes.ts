import { Router } from 'express'
import {
  getAllMedia,
  getImageMedia,
  getVideoMedia,
  uploadMedia,
  uploadMultipleMedia
} from '../controllers'
import { authenticate, authorizeRoles, uploadMultiple, uploadSingle } from '../middlewares'
import { ROLES } from '../constants'

const router = Router()

// Admin-only routes
router.post('/upload', authenticate, authorizeRoles(ROLES.ADMIN), uploadSingle, uploadMedia)
router.get('/all', authenticate, authorizeRoles(ROLES.ADMIN), getAllMedia)
router.get('/images', authenticate, authorizeRoles(ROLES.ADMIN), getImageMedia)
router.get('/videos', authenticate, authorizeRoles(ROLES.ADMIN), getVideoMedia)

// Public Routes
router.post('/upload-multiple', uploadMultiple, uploadMultipleMedia)

export default router
