import { Router } from 'express'

import { authenticate, authorizeRoles, validate } from '../middlewares'
import { ROLES } from '../constants'
import { createPageSchema } from '../validators'
import { createPage, deletePage, getPageBySlug, updatePage } from '../controllers'

const router = Router()

// Admin-only routes
router.post('/', authenticate, authorizeRoles(ROLES.ADMIN), validate(createPageSchema), createPage)
router.put('/:id', authenticate, authorizeRoles(ROLES.ADMIN), updatePage)
router.delete('/:id', authenticate, authorizeRoles(ROLES.ADMIN), deletePage)

// Public

router.get('/:slug', getPageBySlug)

export default router
