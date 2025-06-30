import { Request, Response, NextFunction } from 'express'
import { successResponse, errorResponse } from '../utils'
import { MediaService } from '../services'

export const uploadMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file || !req.file.path || !req.file.mimetype) {
      errorResponse(res, 'No file provided', 400, 'FileMissing')
      return
    }
    const result = await MediaService.uploadAndSave(req.file.path, req.file.mimetype)

    successResponse(res, result?.data, `${result?.type} uploaded successfully`, 201)
  } catch (err) {
    next(err)
  }
}

export const uploadMultipleMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as Express.Multer.File[]

    if (!files || files.length === 0) {
      errorResponse(res, 'No files uploaded', 400, 'FilesMissing')
      return
    }

    const uploadedMedia = await MediaService.uploadMultipleAndSave(files)

    successResponse(res, uploadedMedia, 'Media uploaded successfully', 201)
  } catch (error) {
    next(error)
  }
}

export const getAllMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const media = await MediaService.getAllMediaPaginated(page, limit)
    successResponse(res, media, 'Fetched media with pagination')
  } catch (error) {
    next(error)
  }
}

export const getImageMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const media = await MediaService.getImageMediaPaginated(page, limit)
    successResponse(res, media, 'Fetched media with pagination')
  } catch (error) {
    next(error)
  }
}
export const getVideoMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const media = await MediaService.getVideoMediaPaginated(page, limit)
    successResponse(res, media, 'Fetched media with pagination')
  } catch (error) {
    next(error)
  }
}
