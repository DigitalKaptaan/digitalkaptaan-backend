import { Request, Response, NextFunction } from 'express'
import { errorResponse } from '../utils'
import Joi from 'joi'

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body)

    if (error) {
      errorResponse(res, error.details[0].message, 400, 'BAD_REQUEST')
      return
    }
    next()
  }
}
