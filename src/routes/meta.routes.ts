import { Router } from 'express'
import { createMeta, deleteMeta, getMeta, listAllMeta, updateMeta } from '../controllers'
import { authenticate, authorizeRoles, validate } from '../middlewares'
import { ROLES } from '../constants'
import { createMetaSchema } from '../validators'

const router = Router()

// Admin-only routes
router.post('/', authenticate, authorizeRoles(ROLES.ADMIN), validate(createMetaSchema), createMeta)
router.get('/', authenticate, authorizeRoles(ROLES.ADMIN), listAllMeta)
router.put('/:page', authenticate, authorizeRoles(ROLES.ADMIN), updateMeta)
router.delete('/:page', authenticate, authorizeRoles(ROLES.ADMIN), deleteMeta)

// Public read access
router.get('/:page', getMeta)

export default router
