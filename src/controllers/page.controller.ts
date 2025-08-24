import { Request, Response, NextFunction } from 'express'
import { successResponse, errorResponse } from '../utils'
import { BlogService, PageService } from '../services'

export const createPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = await PageService.createPage(req.body)
    successResponse(res, page, 'Page created', 201)
  } catch (err) {
    next(err)
  }
}

export const getPageBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page: any
    let latestBlogs: any = undefined

    if (req.params.slug === 'our-services') {
      ;[page, latestBlogs] = await Promise.all([
        PageService.getPageBySlug(req.params.slug),
        BlogService.getLatestBlogs(3)
      ])
    } else {
      page = await PageService.getPageBySlug(req.params.slug)
    }

    if (!page) {
      errorResponse(res, 'Page not found', 404, 'PageNotFound')
      return
    }

    const enrichedPage = {
      ...(page.toObject?.() ?? page),
      ...(latestBlogs ? { latestBlogs } : {})
    }

    successResponse(res, enrichedPage, 'Page fetched')
  } catch (err) {
    next(err)
  }
}

export const updatePage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = await PageService.updatePage(req.params.id, req.body)
    if (!page) {
      errorResponse(res, 'Page not found', 404, 'PageNotFound')
      return
    }
    successResponse(res, page, 'Page updated')
  } catch (err) {
    next(err)
  }
}

export const deletePage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await PageService.deletePage(req.params.id)
    if (!result) {
      errorResponse(res, 'Page not found', 404, 'PageNotFound')
      return
    }
    successResponse(res, null, 'Page deleted')
  } catch (err) {
    next(err)
  }
}
