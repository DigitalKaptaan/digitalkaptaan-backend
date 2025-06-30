import Joi from 'joi'

export const createBlogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  coverImage: Joi.string().uri().required(),
  status: Joi.string().valid('draft', 'published'),
  meta: Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    keywords: Joi.array().items(Joi.string()).optional()
  }).optional()
})
