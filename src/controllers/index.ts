export { login, register } from './auth.controller'
export {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  getAllPublishedBlogs,
  getAllBlogBySlug
} from './blog.controller'
export { createMeta, listAllMeta, deleteMeta, getMeta, updateMeta } from './meta.controller'
export { createMenu, deleteMenu, getAllMenus, getMenuBySlug, updateMenu } from './menu.controller'
export { createPage, deletePage, getPageBySlug, updatePage } from './page.controller'
export {
  uploadMedia,
  uploadMultipleMedia,
  getAllMedia,
  getImageMedia,
  getVideoMedia
} from './media.controller'

export { getCustomerRequests, submitCustomerRequest } from './customerRequest.controller'
export { getContact, upsertContact } from './contact.controller'
