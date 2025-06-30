import { Response, NextFunction } from 'express'
import { errorResponse } from '../utils'
import { AuthenticatedRequest } from './auth.middleware'

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role

    if (!userRole || !allowedRoles.includes(userRole)) {
      errorResponse(res, 'Forbidden: insufficient privileges', 403, 'ROLE_DENIED')
      return
    }

    next()
  }
}
