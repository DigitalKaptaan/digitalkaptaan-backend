import { Router } from 'express'
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  getAllPublishedBlogs,
  getAllBlogBySlug
} from '../controllers'
import { authenticate, authorizeRoles, uploadSingle, validate } from '../middlewares'
import { createBlogSchema } from '../validators'
import { ROLES } from '../constants'

const router = Router()

// Public routes
router.get('/', getAllPublishedBlogs)
router.get('/:slug', getBlogBySlug)
router.get('/admin/by/:slug', authenticate, authorizeRoles(ROLES.ADMIN), getAllBlogBySlug)

// Admin-only routes
router.get('/admin/blogs', authenticate, authorizeRoles(ROLES.ADMIN), getAllBlogs)
router.post(
  '/admin/create',
  authenticate,
  authorizeRoles(ROLES.ADMIN),
  validate(createBlogSchema),
  uploadSingle,
  createBlog
)
router.put(
  '/:slug',
  authenticate,
  authorizeRoles(ROLES.ADMIN),
  validate(createBlogSchema),
  updateBlog
)
router.delete('/:id', authenticate, authorizeRoles(ROLES.ADMIN), deleteBlog)

export default router
