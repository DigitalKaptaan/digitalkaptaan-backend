import { Response } from 'express'

export const successResponse = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  })
}

export const errorResponse = (
  res: Response,
  message = 'Something went wrong',
  statusCode = 500,
  errorCode = 'INTERNAL_SERVER_ERROR',
  errors: any = null
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    errorCode,
    errors
  })
}
