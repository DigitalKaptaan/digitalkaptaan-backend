import { Request, Response, NextFunction } from 'express'
import { successResponse, errorResponse, uploadOnCloudinary } from '../utils'
import { BlogService } from '../services'

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file || !req.file.path || !req.file.mimetype) {
      errorResponse(res, 'No file provided', 400, 'FileMissing')
      return
    }

    const blog = await BlogService.create(req.body, req.file.path, req.file.mimetype)
    successResponse(res, blog, 'Blog created successfully', 201)
  } catch (err) {
    next(err)
  }
}

export const getAllBlogs = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const blogs = await BlogService.findAllPublished()
    successResponse(res, blogs, 'Fetched published blogs')
  } catch (err) {
    next(err)
  }
}

export const getBlogBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await BlogService.findBySlug(req.params.slug)
    if (!blog) {
      errorResponse(res, 'Blog not found', 404, 'BlogNotFound')
      return
    }
    successResponse(res, blog, 'Fetched blog')
  } catch (err) {
    next(err)
  }
}

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await BlogService.updateById(req.params.id, req.body)
    if (!blog) {
      errorResponse(res, 'Blog not found', 404, 'BlogNotFound')
      return
    }
    successResponse(res, blog, 'Blog updated')
  } catch (err) {
    next(err)
  }
}

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await BlogService.deleteById(req.params.id)
    if (!blog) {
      errorResponse(res, 'Blog not found', 404, 'BlogNotFound')
      return
    }
    successResponse(res, null, 'Blog deleted')
  } catch (err) {
    next(err)
  }
}
