import { Request, Response, NextFunction } from 'express'
import { successResponse, errorResponse } from '../utils'
import { MenuService } from '../services'

export const createMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const menu = await MenuService.createMenu(req.body)
    successResponse(res, menu, 'Menu created successfully', 201)
  } catch (err) {
    next(err)
  }
}

export const getAllMenus = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const menus = await MenuService.getAllMenus()
    successResponse(res, menus, 'Fetched all menus')
  } catch (err) {
    next(err)
  }
}

export const getMenuBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const menu = await MenuService.getMenuBySlug(req.params.slug)
    if (!menu) {
      errorResponse(res, 'Menu not found', 404, 'MenuNotFound')
      return
    }
    successResponse(res, menu, 'Fetched menu')
  } catch (err) {
    next(err)
  }
}

export const updateMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const menu = await MenuService.updateMenu(req.params.id, req.body)
    if (!menu) {
      errorResponse(res, 'Menu not found', 404, 'MenuNotFound')
      return
    }
    successResponse(res, menu, 'Menu updated')
  } catch (err) {
    next(err)
  }
}

export const deleteMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const menu = await MenuService.deleteMenu(req.params.id)
    if (!menu) {
      errorResponse(res, 'Menu not found', 404, 'MenuNotFound')
      return
    }
    successResponse(res, null, 'Menu deleted')
  } catch (err) {
    next(err)
  }
}
