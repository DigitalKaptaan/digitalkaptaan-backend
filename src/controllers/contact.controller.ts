import { Request, Response, NextFunction } from 'express'
import { ContactService } from '../services'
import { successResponse } from '../utils'

export const upsertContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = await ContactService.upsertContact(req.body)
    successResponse(res, contact, 'Contact saved successfully')
    return
  } catch (err) {
    next(err)
  }
}

export const getContact = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = await ContactService.getContact()
    successResponse(res, contact, 'Contact fetched successfully')
    return
  } catch (err) {
    next(err)
  }
}
