import { Request, Response, NextFunction } from 'express'
import { errorResponse, verifyToken } from '../utils'

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string }
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    errorResponse(res, 'No token provided', 401, 'AUTH_INVALID')
    return
  }

  try {
    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)
    req.user = decoded as { id: string; role: string }
    next()
  } catch (err) {
    errorResponse(res, 'No token provided', 401, 'AUTH_INVALID')
    return
  }
}
