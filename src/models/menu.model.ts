import { Schema, model, Document } from 'mongoose'

interface MenuItem {
  label: string
  url: string
  external?: boolean
  order?: number
  children?: MenuItem[]
}

export interface IMenu extends Document {
  name: string
  slug: string
  items: MenuItem[]
}

const MenuItemSchema = new Schema<MenuItem>(
  {
    label: { type: String, required: true },
    url: { type: String, required: true },
    external: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    children: [new Schema<MenuItem>({}, { _id: false })]
  },
  { _id: false }
)

MenuItemSchema.add({
  children: [MenuItemSchema]
})

const MenuSchema = new Schema<IMenu>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    items: [MenuItemSchema]
  },
  { timestamps: true }
)

const Menu = model<IMenu>('Menu', MenuSchema)
export default Menu
