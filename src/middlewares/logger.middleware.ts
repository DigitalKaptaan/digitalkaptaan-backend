import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils'

export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.originalUrl}`)
  next()
}
