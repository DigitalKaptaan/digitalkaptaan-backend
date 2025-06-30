import { Request, Response, NextFunction } from 'express'
import { successResponse, errorResponse } from '../utils'
import { AuthService } from '../services'

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const result = await AuthService.login(email, password)
    successResponse(res, result, 'Login successful', 200)
  } catch (err: any) {
    errorResponse(res, err.message, err.status || 500, err.code || 'LoginError')
  }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const result = await AuthService.register(email, password)
    successResponse(res, result, 'Registration successful', 201)
  } catch (err: any) {
    errorResponse(res, err.message, err.status || 500, err.code || 'RegistrationError')
  }
}
