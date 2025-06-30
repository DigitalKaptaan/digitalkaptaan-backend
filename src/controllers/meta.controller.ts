import { Request, Response, NextFunction } from 'express'
import { MetaService } from '../services/meta.service'
import { successResponse, errorResponse } from '../utils'

export const createMeta = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const meta = await MetaService.create(req.body)
    successResponse(res, meta, 'Meta created successfully', 201)
  } catch (err) {
    next(err)
  }
}

export const getMeta = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const meta = await MetaService.getByPage(req.params.page)
    if (!meta) {
      errorResponse(res, 'Meta not found', 404, 'MetaNotFound')
      return
    }
    successResponse(res, meta)
  } catch (err) {
    next(err)
  }
}

export const updateMeta = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const meta = await MetaService.updateByPage(req.params.page, req.body)
    successResponse(res, meta, 'Meta updated')
  } catch (err) {
    next(err)
  }
}

export const listAllMeta = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const metas = await MetaService.getAll()
    successResponse(res, metas, 'Meta list fetched')
  } catch (err) {
    next(err)
  }
}

export const deleteMeta = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await MetaService.deleteByPage(req.params.page)
    if (!result) {
      errorResponse(res, 'Meta not found', 404, 'MetaNotFound')
      return
    }
    successResponse(res, null, 'Meta deleted')
  } catch (err) {
    next(err)
  }
}
