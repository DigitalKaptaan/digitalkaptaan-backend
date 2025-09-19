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

// Admin-only routes (put before `/:slug`)
router.get('/admin/blogs', authenticate, authorizeRoles(ROLES.ADMIN), getAllBlogs)
router.get('/admin/by/:slug', authenticate, authorizeRoles(ROLES.ADMIN), getAllBlogBySlug)
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

// Dynamic route should come last
router.get('/:slug', getBlogBySlug)

export default router
