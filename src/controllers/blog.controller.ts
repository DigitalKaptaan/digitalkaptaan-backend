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
    console.log('error', err)
    next(err)
  }
}

export const getAllPublishedBlogs = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, pageSize = 10 } = _req.query

    const blogs = await BlogService.findAllPublished(Number(page), Number(pageSize))
    successResponse(res, blogs, 'Fetched published blogs')
  } catch (err) {
    next(err)
  }
}
export const getAllBlogs = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, pageSize = 10 } = _req.query

    const { data, total } = await BlogService.findAllBlogs(Number(page), Number(pageSize))

    const pagination = {
      page: Number(page),
      pageSize: Number(pageSize),
      totalItems: total,
      totalPages: Math.ceil(total / Number(pageSize))
    }

    successResponse(res, { blogs: data, pagination }, 'Fetched blogs')
  } catch (err) {
    console.log('err', err)
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
export const getAllBlogBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await BlogService.findByAllSlug(req.params.slug)
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
    const blog = await BlogService.updateBySlug(req.params.slug, req.body)
    console.log('blog', blog, req.params.slug)
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
