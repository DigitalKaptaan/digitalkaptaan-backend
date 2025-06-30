import Joi from 'joi'

export const sectionSchema = Joi.object({
  type: Joi.string().required(), // "hero", "stats", etc.
  content: Joi.object().required(),
  order: Joi.number().optional()
})

export const createPageSchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
  sections: Joi.array().items(sectionSchema).optional()
})
