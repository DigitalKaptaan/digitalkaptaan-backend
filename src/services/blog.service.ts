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

  findAllPublished: async (page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize
    return await Blog.find({ status: 'published' })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
  },
  findAllBlogs: async (page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize
    const [data, total] = await Promise.all([
      Blog.find().skip(skip).limit(pageSize).sort({ createdAt: -1 }),
      Blog.countDocuments()
    ])

    return { data, total }
  },

  findBySlug: async (slug: string) => {
    return await Blog.findOne({ slug, status: 'published' })
  },
  findByAllSlug: async (slug: string) => {
    return await Blog.findOne({ slug })
  },

  updateBySlug: async (slug: string, data: Partial<IBlog>) => {
    return await Blog.findOneAndUpdate({ slug }, data, { new: true })
  },

  deleteById: async (id: string) => {
    return await Blog.findByIdAndDelete(id)
  }
}
