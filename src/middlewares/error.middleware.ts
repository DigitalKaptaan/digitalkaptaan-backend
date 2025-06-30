import { Request, Response, NextFunction } from 'express'
import { ApiError, errorResponse } from '../utils'

export const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('❌ Error:', err)

  if (err instanceof ApiError) {
    errorResponse(res, err.message, err.statusCode, err.errorCode, err.errors)
  } else {
    errorResponse(res, 'Internal Server Error', 500, 'INTERNAL_SERVER_ERROR')
  }
}
