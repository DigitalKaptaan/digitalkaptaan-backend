import { Router } from 'express'
import { createBlog, getAllBlogs, getBlogBySlug, updateBlog, deleteBlog } from '../controllers'
import { authenticate, authorizeRoles, uploadSingle, validate } from '../middlewares'
import { createBlogSchema } from '../validators'
import { ROLES } from '../constants'

const router = Router()

// Public routes
router.get('/', getAllBlogs)
router.get('/:slug', getBlogBySlug)

// Admin-only routes
router.post(
  '/',
  authenticate,
  authorizeRoles(ROLES.ADMIN),
  validate(createBlogSchema),
  uploadSingle,
  createBlog
)
router.put(
  '/:id',
  authenticate,
  authorizeRoles(ROLES.ADMIN),
  validate(createBlogSchema),
  updateBlog
)
router.delete('/:id', authenticate, authorizeRoles(ROLES.ADMIN), deleteBlog)

export default router
