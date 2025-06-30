import { IMenu, Menu } from '../models'

export const MenuService = {
  createMenu: (data: Partial<IMenu>) => Menu.create(data),

  getAllMenus: () => Menu.find().sort({ createdAt: -1 }),
  getMenuBySlug: (slug: string) => Menu.findOne({ slug }),
  updateMenu: (id: string, data: Partial<IMenu>) => Menu.findByIdAndUpdate(id, data, { new: true }),
  deleteMenu: (id: string) => Menu.findByIdAndDelete(id)
}
