import { Request, Response, NextFunction } from 'express'
import { successResponse, errorResponse } from '../utils'
import { CustomerRequestService } from '../services'

export const submitCustomerRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const saved = await CustomerRequestService.create(req.body)
    successResponse(res, saved, 'Request submitted successfully', 201)
  } catch (err) {
    next(err)
  }
}

export const getCustomerRequests = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const requests = await CustomerRequestService.getAll()
    successResponse(res, requests, 'Fetched requests')
  } catch (err) {
    next(err)
  }
}
