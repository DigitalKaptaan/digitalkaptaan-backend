export interface MenuItem {
  label: string
  url: string
  external?: boolean
  order?: number
  children?: MenuItem[]
}

export interface MenuType {
  name: string
  slug: string
  items: MenuItem[]
}
