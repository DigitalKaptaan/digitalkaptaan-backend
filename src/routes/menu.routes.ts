import { Router } from 'express'
import { createMenu, deleteMenu, getAllMenus, getMenuBySlug, updateMenu } from '../controllers'
import { authenticate, authorizeRoles, validate } from '../middlewares'
import { ROLES } from '../constants'
import { createMenuSchema, updateMenuSchema } from '../validators'

const router = Router()

// Public Routes
router.get('/', getAllMenus)
router.get('/:slug', getMenuBySlug)

// Admin-only routes
router.post('/', authenticate, authorizeRoles(ROLES.ADMIN), validate(createMenuSchema), createMenu)

router.put(
  '/:id',
  authenticate,
  authorizeRoles(ROLES.ADMIN),
  validate(updateMenuSchema),
  updateMenu
)

router.delete('/:id', authenticate, authorizeRoles(ROLES.ADMIN), deleteMenu)

export default router
