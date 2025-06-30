import { Blog, IBlog } from '../models'
import { uploadOnCloudinary } from '../utils'

export const BlogService = {
  create: async (data: Partial<IBlog>, localFilePath: string, mimetype: string) => {
    const uploadResult = await uploadOnCloudinary(localFilePath, mimetype)

    if (!uploadResult || !uploadResult.secure_url || !uploadResult.resource_type) {
      throw new Error('Upload failed or unsupported media type')
    }

    const blog = new Blog({
      ...data,
      ...(typeof data.meta === 'string' && { meta: JSON.parse(data.meta) }),
      coverImage: uploadResult.secure_url
    })
    return await blog.save()
  },

  findAllPublished: async () => {
    return await Blog.find({ status: 'published' }).sort({ createdAt: -1 })
  },

  findBySlug: async (slug: string) => {
    return await Blog.findOne({ slug, status: 'published' })
  },

  updateById: async (id: string, data: Partial<IBlog>) => {
    return await Blog.findByIdAndUpdate(id, data, { new: true })
  },

  deleteById: async (id: string) => {
    return await Blog.findByIdAndDelete(id)
  }
}
