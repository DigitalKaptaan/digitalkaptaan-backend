import Joi from 'joi'

export const createMetaSchema = Joi.object({
  page: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
  keywords: Joi.array().items(Joi.string()).optional(),
  ogTitle: Joi.string().allow('', null),
  ogDescription: Joi.string().allow('', null),
  ogImage: Joi.string().uri().allow('', null)
})
